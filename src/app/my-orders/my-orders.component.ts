import { Component, OnInit } from '@angular/core';
import { faTintSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { OrdersService } from '../services/orders.service';
import { Order } from '../store';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  error !: string;
  myOrders !: Array<Order> | null;
  another = [1,2,3,4,5];
  whut = true;

  constructor(private orderService: OrdersService, private authService: AuthService) { }

  ngOnInit(): void {

    let uid = this.authService.currentUser?.uid;

    if(uid){
      this.orderService.getMyOrders(uid)
        .subscribe(        
           orders => {
            this.myOrders = orders as Order[];
            console.log('myOrders', this.myOrders);
          }
        );
    }

  }

}