import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPayPalConfig, IPurchaseUnit } from 'ngx-paypal';
import { ArticleService } from './services/article.service';
import { CountryService } from './services/country.service';
import { OrderService } from './services/order.service';
import { PayPalService } from './services/pay-pal.service';
import { ShoppingBasketService } from './services/shopping-basket.service';

enum Page {
  SHOP = 'shop',
  BASKET = 'basket',
  SUCCESS = 'success'
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  page: string = Page.SHOP;

  articles: any[];
  countries: any[];
  countries_eu: any[];
  shippingFees: any[];

  payPalConfig?: IPayPalConfig;

  // the paypal order
  order: IPurchaseUnit[];

  // form controls for shop (page 1)
  nrOfItems = new FormControl('');
  shirtSize = new FormControl('');
  country = new FormControl('');
  billingShippingSame = new FormControl('');

  // form controls for adddress (page 2)
  billingAddressForm: FormGroup;
  shippingAddressForm: FormGroup;
  billingFormSubmitted: boolean = false;

  constructor(private countryService: CountryService,
              private articleService: ArticleService,
              private shoppingBasketService: ShoppingBasketService,
              private payPalService: PayPalService,
              private orderService: OrderService,
              private fb: FormBuilder) {

    this.prepareFormData();

    this.countryService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data;
      this.country.setValue('Netherlands');
    });

    this.countryService.getEuCountries().subscribe((data: any[]) => {
      this.countries_eu = data;
    });

    this.shoppingBasketService.getShippingFees().subscribe((data: any[]) => {
      this.shippingFees = data;
    });
  }

  get getCartItems() {
    return this.shoppingBasketService.getItemsInCart();
  }

  get getTotalPriceFromCart() {
    return this.shoppingBasketService.getTotalPrice();
  }

  get getProductPriceFromCart() {
    return this.shoppingBasketService.getProductPrice();
  }

  get f() {
    return this.billingAddressForm.controls;
  }

  get sf() {
    return this.shippingAddressForm.controls;
  }

  get getShippingFeeFromCart() {
    return this.shoppingBasketService.getShippingFee();
  }

  get readyForPayment() {
    let result = this.billingAddressForm.valid;
    if (!this.billingShippingSame.value) { // addresses not the same
      result = result && this.shippingAddressForm.valid;
    }

    // HERE ALL IS GOOD AND WE WILL SHOW THE PAYMENT BUTTONS!
    if (result) {
      this.payPalService.addEmail(this.f.email.value);
      this.payPalService.addPhoneNumber(this.f.phone.value);
      this.payPalService.addFullName(this.f.firstName.value, this.f.lastName.value);

      this.payPalService.addBillingAddress(
        {
          country_code: this.f.country.value,
          address_line_1: this.f.address.value,
          address_line_2: '',
          admin_area_2: this.f.city.value,
          admin_area_1: this.countries.filter(country => country.alpha2Code === this.f.country.value)[0].name,
          postal_code: this.f.zipCode.value
        }
      );

      if (this.billingShippingSame.value) {
        this.payPalService.copyBillingAddressToShippingAddress();
      } else {
        this.payPalService.addShippingAddress(
          {
            country_code: this.sf.country.value,
            address_line_1: this.sf.address.value,
            address_line_2: '',
            admin_area_2: this.sf.city.value,
            admin_area_1: this.countries.filter(country => country.alpha2Code === this.sf.country.value)[0].name,
            postal_code: this.sf.zipCode.value
          }
        );
      }
    }

    return result;
  }

  get showSuccessPage() {
    if (this.payPalService.payPalStatus.showSuccess) {
      console.log(this.payPalService.payPalStatus.showSuccess);
      this.page = Page.SUCCESS;
    }
    return this.payPalService.payPalStatus.showSuccess;
  }

  /**
   * Returns the order Id after a successfull purchase
   */
  get orderId() {
    return this.payPalService.payPalStatus.data.purchase_units[0].payments.captures[0].id
  }

  /**
   * Returns the order Id after a successfull purchase
   */
  get isTestOnCancel() {
    console.log(`isTestOnCancel: ${this.payPalService.payPalStatus.data.localTestResponse}`);
    return this.payPalService.payPalStatus.data.localTestResponse;
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    console.log('WINDOW FOCUS!');
    if (this.payPalService.payPalStatus.showSuccess && !this.payPalService.payPalStatus.test) {

      // add extra fields for database
      this.payPalService.payPalStatus.data.order_id =
        this.payPalService.payPalStatus.data.purchase_units[0].payments.captures[0].id;
      this.payPalService.payPalStatus.data.full_name =
        this.payPalService.payPalStatus.data.purchase_units[0].shipping.name.full_name;

      // save order in the db
      this.orderService.saveOrder(this.payPalService.payPalStatus.data).subscribe((result) => {
        console.log(`order saved successfully: ${JSON.stringify(result)}`);
      });

    }
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    console.log('WINDOW BLUR!');
  }

  ngOnInit(): void {
    this.payPalConfig = this.payPalService.getPayPalConfig();
  }

  prepareFormData() {
    this.shirtSize.setValue('L');
    this.nrOfItems.setValue(1);

    this.articleService.getArticles().subscribe((result: any) => {
      this.articles = result;
    });

    const controls: any = {
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    };

    this.billingAddressForm = this.fb.group(controls);
    this.shippingAddressForm = this.fb.group(controls);

    this.billingShippingSame.setValue(true);
  }

  onClickSubmit() {
    this.billingFormSubmitted = true;
    if (this.billingAddressForm.invalid) {
      console.log(`form invalid`);
      console.log(this.billingAddressForm.controls.email.status);
      return;
    }
  }

  /**
   * Updates the shiping fee depending on the location and the package size.
   */
  updateShippingFee() {
    if (this.shoppingBasketService.isTestOrder()) {
      return;
    }

    let largeOrder = this.shoppingBasketService.isLargeOrder();
    console.log(`largeOrder: ${largeOrder}`);

    if (this.f.country.value === 'NL') {
      const fee = this.shippingFees.filter(fee => fee.area === 'NL')[0];
      this.shoppingBasketService.setShippingFee(largeOrder ? fee.priceL : fee.priceS);
    } else {
      const result = this.countries_eu.filter((country) => country.alpha2Code === this.f.country.value)[0];
      if (result) {
        const fee = this.shippingFees.filter(fee => fee.area === 'EU')[0];
        this.shoppingBasketService.setShippingFee(largeOrder ? fee.priceL : fee.priceS);
      } else {
        const fee = this.shippingFees.filter(fee => fee.area === 'World')[0];
        this.shoppingBasketService.setShippingFee(largeOrder ? fee.priceL : fee.priceS);
      }
    }
  }

  goToBasket() {
    this.page = Page.BASKET;

    this.setAmountWithoutShipping();
    if (this.shoppingBasketService.getShippingFee() > 0) {
      this.updateShippingFee();
    }
  }

  goToShop() {
    this.page = Page.SHOP;
  }

  resetShop() {
    this.page = Page.SHOP;
    this.shoppingBasketService.resetCart();
    this.billingAddressForm.reset();
    this.shippingAddressForm.reset();
  }

  addItem(item: any) {
    console.log(`this.nrOfItems: ${this.nrOfItems.value}`);
    console.log(`this.shirtSize: ${this.shirtSize.value}`);

    this.shoppingBasketService.addItem(item, this.nrOfItems.value, this.shirtSize.value);
    this.nrOfItems.setValue(1);
  }

  removeItem(item: any) {
    this.shoppingBasketService.removeItemFromCart(item);
  }

  setAmountWithoutShipping() {
    this.payPalService.addAmountToPurchaseUnit(parseFloat(String((this.getProductPriceFromCart * 100) / 100)).toFixed(2));
  }
}
