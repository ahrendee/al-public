import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { PayPalService } from '../../shop/services/pay-pal.service';

@Component({
  selector: 'app-paypal-integration',
  templateUrl: './paypal-integration.component.html',
  styleUrls: ['./paypal-integration.component.scss']
})
export class PaypalIntegrationComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef,
              private payPalService: PayPalService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = 'console.log(\'done\');'; //inline script
    s.innerHTML = `paypal.Buttons(${this.setOrderInfo()}).render('#paypal-button-container');`;
    this.elementRef.nativeElement.appendChild(s);
  }

  setOrderInfo() {
    return `{
      // Set up the transaction
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [${JSON.stringify(this.payPalService.purchaseUnit)}],
          payer: ${JSON.stringify(this.payPalService.payer)}
        });
      },
      // Finalize the transaction
      onApprove: function (data, actions) {
        return actions.order.capture().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          console.log(JSON.stringify(details));
          const order = details;
          console.log(order.purchase_units[0].payments.captures[0].id);
          window.location = '#/successful-purchase?order=' + JSON.stringify(order);
          // const form = document.createElement("form");
          // form.method = "GET";
          // form.action = "/#/successful-purchase";
          // const input = document.createElement("input");
          // input.type = "text";
          // input.name = "order";
          // input.value = order.purchase_units[0].payments.captures[0].id;
          // form.appendChild(input);
          // document.body.appendChild(form);
          // form.submit();
        });
      }
    }`;
  }
}
