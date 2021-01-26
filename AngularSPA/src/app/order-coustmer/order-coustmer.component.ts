import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-coustmer',
  templateUrl: './order-coustmer.component.html',
  styleUrls: ['./order-coustmer.component.scss']
})
export class OrderCoustmerComponent implements OnInit {
  states: string = 'OnWay';
  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    this.orderService.getOrdersForUser(userId).subscribe((res: Order[]) => {
      this.orders = res;
    }, err => {
      console.error(err);
    });
  }
  orderOption(states) {
    this.states = states
  }
}
