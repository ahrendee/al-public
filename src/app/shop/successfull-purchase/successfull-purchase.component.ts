import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-successfull-purchase',
  templateUrl: './successfull-purchase.component.html',
  styleUrls: ['./successfull-purchase.component.scss']
})
export class SuccessfullPurchaseComponent implements OnInit {

  order: any;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.order = JSON.parse(params.order);
      this.saveOrder();
    });
  }

  get orderId() {
    return this.order.purchase_units[0].payments.captures[0].id;
  }

  ngOnInit(): void {
  }

  private saveOrder() {
    console.log(`saving order with order id ${this.orderId}`);
    this.order.order_id = this.order.purchase_units[0].payments.captures[0].id;
    this.order.full_name = this.order.purchase_units[0].shipping.name.full_name;

    // save order in the db
    this.orderService.saveOrder(this.order).subscribe((result) => {
      console.log(`order saved successfully: ${JSON.stringify(result)}`);
    });

  }
}

