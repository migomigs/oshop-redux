import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IAppState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db: AngularFirestore, private ngRedux: NgRedux<IAppState>)  { 
  }

  get ordersCollectionRef() {
    return this.db.collection('orders');
  }

  loadAllOrders(){   
    this.ordersCollectionRef.valueChanges({idField: 'id'})
      .subscribe( orders => {
        console.log('orders', orders);
      })
    
  }
}