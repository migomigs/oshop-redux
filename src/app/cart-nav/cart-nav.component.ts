import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Product, ProductsService } from '../services/products.service';
import { getProductInCart } from '../shopping-cart/shopping-cart.component';
import { IAppState } from '../store';


// const selectTotalItemsInCart = (state: IAppState): Observable<number> => {
//     let qtyArray =  state.productList.map((product:Product) => product.qtyInCart);
//     //let sumReduce = (cumulator:number, number:number, index: number, []) => {cumulator + number};
//     let total = 0;
//     if(qtyArray && qtyArray.length > 0){
//       total = qtyArray.reduce(function(a, b){ return a + b; }); 
//     }
    
//    //console.log('qty array', qtyArray.reduce(sumReduce, 0);
//    return from(qtyArray);
// }

@Component({
  selector: 'cart-nav',
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.css']
})
export class CartNavComponent implements OnInit {

  //@select(selectProductInCart) productsInCart$ !: Observable<Product[]>;
  @select('productList') productList$ !: Observable<Product[]>;
  //@select(selectTotalItemsInCart) totalItems$!: Observable<number>;
  @select('orderList') orderList$ !: Observable<Product[]>;
  constructor(private ngRedux: NgRedux<IAppState>, private productService: ProductsService) { }


  ngOnInit(): void {
  }

  loadState(){

    let subscription = this.orderList$.subscribe((orderList:Product[]) =>{
           this.productService.returnOrderToCartList(orderList);
    });
    subscription.unsubscribe();
  }

  log(p: any){
  }

}
