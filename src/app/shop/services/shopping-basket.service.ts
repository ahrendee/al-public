import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { PayPal, RestApiUrl } from '../../config/config';
import { BaseService } from '../../util/BaseService.service';
import { Item } from '../model/paypal/payer.model';
import { SelectedArticle } from '../model/selected-article.model';
import { PayPalService } from './pay-pal.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService extends BaseService {

  private selectedArticles: any[] = [];
  private productPrice: number = 0;
  private totalPrice: number = 0;
  private shippingFee: number = 0;
  // TODO is this still necessary?
  private previousShippingFee: number = 0;

  constructor(private http: HttpClient,
              private payPalService: PayPalService) {
    super();
  }

  resetCart() {
    this.selectedArticles = [];
    this.productPrice = 0;
    this.totalPrice = 0;
    this.shippingFee = 0;
    this.previousShippingFee = 0;

    this.payPalService.resetConfig();
  }

  /**
   * Retrieve the shipping fees
   */
  getShippingFees() {
    return this.http.get(RestApiUrl.shippingAreas)
      .pipe(catchError(this.errorHandler))
  }

  getShippingFee() {
    return this.shippingFee;
  }

  setShippingFee(shippingFee: string) {
    this.shippingFee = parseInt(shippingFee);
    this.totalPrice = parseFloat(((this.productPrice * 100 + this.shippingFee * 100) / 100).toFixed(2));
    console.log(this.totalPrice);
    this.payPalService.addShippingToPurchaseUnit(shippingFee, String(this.totalPrice));
    this.previousShippingFee = parseInt(shippingFee);
  }

  checkShippingFee() {
    this.setShippingFee(String(this.shippingFee));
  }

  isLargeOrder(): boolean {
    let result = false;
    this.selectedArticles.forEach((item) => {
      if (item.package === 'L'){
        result = true;
      }
    });
    return result;
  }

  isTestOrder() {
    let result = false;
    this.selectedArticles.forEach((item) => {
      if (item.type === 'test'){
        result = true;
      }
    });
    console.log(`isTestOrder: ${result}`);
    return result;
  }

  /**
   * Retrieve the items in the shopping cart
   */
  getItemsInCart() {
    return this.selectedArticles;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getProductPrice() {
    return this.productPrice;
  }

  // TODO check renaming
  updateTotalPrice() {
    this.productPrice = this.selectedArticles.reduce((acc: number, item: SelectedArticle) => {
      return acc + (item.itemPrice * item.items);
    }, 0);
    this.totalPrice = this.productPrice;
    console.log(`productPrice: ${this.productPrice}`);
    console.log(`totalPrice: ${this.totalPrice}`);
  }

  /**
   * Remove an item from the shopping cart
   * @param item
   */
  removeItemFromCart(item: any) {
    const newSelectedArticles = this.selectedArticles.filter(article => article.id !== item.id);
    this.selectedArticles = newSelectedArticles;

    this.updateTotalPrice();

    this.payPalService.removeItemFromPurchaseUnit(item);
  }

  /**
   * Add item to the shopping cart
   * @param item
   * @param nrOfItems
   * @param shirtSize
   */
  addItem(item: any, nrOfItems: string, shirtSize?: string) {
    const selectedShirtSize = item.type === 'tshirt' ? shirtSize : '';
    const selectedItemId = item.id + selectedShirtSize;

    let selArticle = new SelectedArticle(item, nrOfItems, shirtSize);
    console.log(selArticle);

    const existingArticle = this.selectedArticles.filter((article) => {
      console.log(`article.id === selectedItemId: ${article.id === selectedItemId}`);
      return article.id === selectedItemId
    })[0];

    console.log(selArticle.items * selArticle.itemPrice);

    if (existingArticle) {
      console.log(`existingArticle: ${existingArticle}`);
      existingArticle.items = parseInt(existingArticle.items) + selArticle.items;
    } else {
      console.log(`new article: ${JSON.stringify(selArticle)}`);
      this.selectedArticles.push(selArticle);
    }

    this.updateTotalPrice();

    // update PaypalConfig
    const newItem: Item = {
      name: `${selArticle.label} ${selArticle.size}`,
      quantity: selArticle.items.toString(),
      category: 'PHYSICAL_GOODS',
      unit_amount: {
        currency_code: PayPal.currency.EUR,
        value: selArticle.itemPrice.toString()
      },
    };
    this.payPalService.addItemToPurchaseUnit(newItem);
  }
}
