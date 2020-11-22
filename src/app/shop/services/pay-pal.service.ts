import { Injectable } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { PayPal } from '../../config/config';
import { Address, Amount, Item, ItemUnit, Order, Payer, PurchaseUnit } from '../model/paypal/payer.model';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {

  purchaseUnit: PurchaseUnit;
  payer: Payer;

  payPalStatus: any = {
    showSuccess: false,
    data: {}
  }

  constructor(private orderService: OrderService) {
    this.purchaseUnit = new PurchaseUnit();
    this.payer = new Payer();
  }

  resetConfig() {
    this.purchaseUnit = new PurchaseUnit();
    this.payer = new Payer();
    this.payPalStatus = {
      showSuccess: false,
      data: {}
    }
  }

  removeItemFromPurchaseUnit(_item: any) {
    this.purchaseUnit.items = this.purchaseUnit.items.filter(item => !item.name.startsWith(_item.label + _item.size));
    console.log(`purchaseUnit: ${JSON.stringify(this.purchaseUnit.items)}`);
  }

  addItemToPurchaseUnit(_item: Item) {
    if (this.purchaseUnit.items.length > 0) {
      const item: Item = this.purchaseUnit.items.filter(item => item.name.startsWith(_item.name))[0];
      if (item) {
        item.quantity = (parseInt(item.quantity) + parseInt(_item.quantity)).toString();
      } else {
        this.purchaseUnit.items.push(_item);
      }
    } else {
      this.purchaseUnit.items.push(_item);
    }
    console.log(`purchaseUnit: ${JSON.stringify(this.purchaseUnit.items)}`);
  }

  addAmountToPurchaseUnit(totalExclShipping: string) {
    const amount: Amount = {
      currency_code: PayPal.currency.EUR,
      value: totalExclShipping,
      breakdown: {
        item_total: {
          currency_code: PayPal.currency.EUR,
          value: totalExclShipping
        },
        shipping: {
          currency_code: PayPal.currency.EUR,
          value: '0'
        }
      }
    }
    this.purchaseUnit.amount = amount;
    console.log(this.purchaseUnit);
  }

  addShippingToPurchaseUnit(shippingCosts: string, totalInclShipping: string) {
    const shipping: ItemUnit = {
      currency_code: PayPal.currency.EUR,
      value: shippingCosts
    };
    this.purchaseUnit.amount.breakdown.shipping = shipping;
    this.purchaseUnit.amount.value = totalInclShipping;
    console.log(this.purchaseUnit);
  }

  addBillingAddress(address: Address) {
    this.payer.address = address;
  }

  addShippingAddress(address: Address) {
    this.purchaseUnit.shipping.address = address;
  }

  addPhoneNumber(phoneNumber: string) {
    this.payer.phone.phone_number.national_number = phoneNumber;
  }

  addEmail(email: string) {
    this.payer.email_address = email;
  }

  addFullName(firstName: string, lastName: string) {
    this.purchaseUnit.shipping.name.full_name = `${firstName} ${lastName}`;
  }

  copyBillingAddressToShippingAddress() {
    this.purchaseUnit.shipping.address = this.payer.address;
  }

  getPayPalConfig(): IPayPalConfig {

    console.log(`setup IPayPalConfig`);

    return {
      currency: PayPal.currency.EUR,
      clientId: PayPal.clientId,
      advanced: {
        commit: 'true',
      },
      style: {
        color: 'silver',
        label: 'paypal',
        layout: 'vertical'
      },
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          this.purchaseUnit
        ],
        payer: this.payer
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data: any) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        const order: Order = data;
        console.log(order.purchase_units[0].payments.captures[0].id);

        this.payPalStatus.data = order;
        this.payPalStatus.showSuccess = true;
        window.focus();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

        // TODO remove test stuff below
        // const order: Order = TestPayPalResponse.data;
        // console.log(order.purchase_units[0].payments.captures[0].id);
        // this.payPalStatus.data = order;
        // this.payPalStatus.showSuccess = true;
        // this.payPalStatus.test = true;
        // window.focus();
        // TODO remove test stuff above
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}

export class TestPayPalResponse {
  static data: any = {
    'localTestResponse': true,
    'create_time': '2020-01-29T19:31:11Z',
    'update_time': '2020-01-29T19:32:07Z',
    'id': '6DW17346NK477200J',
    'intent': 'CAPTURE',
    'status': 'COMPLETED',
    'payer': {
      'email_address': 'ronaldpieterse@gmail.com',
      'payer_id': 'Y6FBVWPRD2BKJ',
      'address': {'country_code': 'NL'},
      'name': {'given_name': 'August Life', 'surname': 'Life'}
    },
    'purchase_units': [{
      'description': 'New Eternity (CD)',
      'reference_id': 'default',
      'soft_descriptor': 'PAYPAL *JOHNDOESTES',
      'amount': {
        'value': '17.99',
        'currency_code': 'EUR',
        'breakdown': {
          'item_total': {'value': '13.99', 'currency_code': 'EUR'},
          'shipping': {'value': '4.00', 'currency_code': 'EUR'},
          'handling': {'value': '0.00', 'currency_code': 'EUR'},
          'insurance': {'value': '0.00', 'currency_code': 'EUR'},
          'shipping_discount': {'value': '0.00', 'currency_code': 'EUR'}
        }
      },
      'payee': {'email_address': 'sb-p8spm844641@business.example.com', 'merchant_id': 'JT5SDJFVPTZEA'},
      'items': [{
        'name': 'New Eternity (CD)',
        'unit_amount': {'value': '13.99', 'currency_code': 'EUR'},
        'tax': {'value': '0.00', 'currency_code': 'EUR'},
        'quantity': '1'
      }],
      'shipping': {
        'name': {'full_name': 'Ronald Pieterse'},
        'address': {
          'address_line_1': 'Blastraat 54',
          'admin_area_2': 'Diemen',
          'postal_code': '1111AR',
          'country_code': 'NL'
        }
      },
      'payments': {
        'captures': [{
          'status': 'COMPLETED',
          'id': '5FK64650BE3787051',
          'final_capture': true,
          'create_time': '2020-01-29T19:32:07Z',
          'update_time': '2020-01-29T19:32:07Z',
          'amount': {'value': '17.99', 'currency_code': 'EUR'},
          'seller_protection': {
            'status': 'ELIGIBLE',
            'dispute_categories': ['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION']
          },
          'links': [{
            'href': 'https://api.sandbox.paypal.com/v2/payments/captures/5FK64650BE3787051',
            'rel': 'self',
            'method': 'GET',
            'title': 'GET'
          }, {
            'href': 'https://api.sandbox.paypal.com/v2/payments/captures/5FK64650BE3787051/refund',
            'rel': 'refund',
            'method': 'POST',
            'title': 'POST'
          }, {
            'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/6DW17346NK477200J',
            'rel': 'up',
            'method': 'GET',
            'title': 'GET'
          }]
        }]
      }
    }],
    'links': [{
      'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/6DW17346NK477200J',
      'rel': 'self',
      'method': 'GET',
      'title': 'GET'
    }]
  }
}
