import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../store';

@Component({
  selector: 'order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {

  constructor(private orderService: OrdersService) { }
  orders !: Array<Order>;

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe( orders => {
        console.log('Orders', orders);
        this.orders = orders as Array<Order>;
    })
  }

}
