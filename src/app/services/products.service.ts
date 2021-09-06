import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { AppError } from '../common/app-error';
import { ProducstNotUpdatedError } from '../common/product-not-loaded-error';
import { IAppState, Order, User } from '../store';

export interface Product {
  id : string;
  title: string;
  price: number;
  imgUrl: string;
  qtyInCart: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: any;

  constructor(private db: AngularFirestore, private ngRedux: NgRedux<IAppState>)  { 
  }

  get productsCollectionRef() {
    return this.db.collection('products');
  }

  get ordersCollectionRef() {
    return this.db.collection('orders');
  }

  addProduct(product: Product) {
    return new Promise<any>((resolve, reject) => {
      this.productsCollectionRef.add(product)
      .then(res=> {}, err=> reject(err));
    })
  }

  updateProductQty(productId: string, qty:number){
    return this.productsCollectionRef.doc(productId).update({
      qtyInCart: qty});
  }


  sendOrder (user: User, productList: Array<Product>): Promise<any>{

    let order:Order = {
      user: user,
      orderList: productList
    };
    
    //Add Order
    return this.ordersCollectionRef.add(order);
  }

  createOrderList(orderList: Product[]){

     this.ngRedux.dispatch({
       type: 'CREATE_ORDER_LIST',
       payload: {
         orderList: orderList
        }
      }
        );
  }

  returnOrderToCartList(orderList: Product[]){

    orderList.forEach((product: Product) =>{
       this.updateProductQty(product.id, product.qtyInCart);
    });

    this.ngRedux.dispatch({
      type: 'CLEAR_ORDER_LIST',
      payload: {
        orderList: []
      }
    }
    );

  }

  loadProducts(){   
    this.productsCollectionRef.valueChanges({idField: 'id'})
      .subscribe(
        orderDocs => {
        
        if(orderDocs.length<1){
          this.ngRedux.dispatch({
            type: 'THROW_LOADING_ERROR',
            payload: {
              dataState: {
                  isLoading: false,
                  isLoaded: true,
                  error: new ProducstNotUpdatedError()
          }
        }
      }
          );
        }else{
          this.ngRedux.dispatch({type: 'LOAD_PRODUCTS', 
          payload: {
            productList: orderDocs,
            dataState: {
              isLoading: false,
              isLoaded: true,
              error: null
            }}});
        }

       
      }, 
        error => {
          console.log('error in loading products', error);
          this.ngRedux.dispatch({
            type: 'THROW_LOADING_ERROR',
            payload: {
              dataState: {
                  isLoading: false,
                  isLoaded: false,
                  error: new AppError(error)
          }
        }
      }
          );
        })
    ;
  }

  getProducts(){
    return this.db.collection('products').valueChanges({ idField: 'id' });
  }

  getProductsInCart(): Observable<any>{
    return this.db.collection('cart').valueChanges();
  }



}
