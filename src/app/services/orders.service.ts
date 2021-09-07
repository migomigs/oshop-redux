import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IAppState, Order } from '../store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db: AngularFirestore, private ngRedux: NgRedux<IAppState>)  { 
  }

  get ordersCollectionRef() {
    return this.db.collection('orders');
  }

  getAllOrders(){   
    // return this.ordersCollectionRef.valueChanges({idField: 'id'}); 
    return this.ordersCollectionRef.valueChanges(); 
  }

  getMyOrders(userId: string){
    return this.ordersCollectionRef.valueChanges()
      .pipe(
        map((orders) =>
          orders.filter(value => (value as Order).user.uid == userId)
        )
      );

  }
}