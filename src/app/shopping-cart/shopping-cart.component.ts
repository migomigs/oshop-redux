import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductsService } from '../services/products.service';
import { IAppState } from '../store';


const getSubTotal = (product: Product) => {
  return product.price * product.qtyInCart;
}

const getSum = (accumulator: number, next: number): number =>{
  return accumulator + next;
}

export const getProductInCart = (state: IAppState): Array<Product> =>{
  return state.productList.filter(product => product.qtyInCart > 0 );
}

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @select(getProductInCart) productInCart$ !: Observable<Product[]>;
  @select('orderList') orderList$ !: Observable<Product[]>;

  constructor( private ngRedux: NgRedux<IAppState>, 
    private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.returnOrderToCart();
  }

  returnOrderToCart(){
    let subscription = this.orderList$.subscribe((orderList:Product[]) =>{
           this.productService.returnOrderToCartList(orderList);
    });
    subscription.unsubscribe();
  }

  getSubtotal(product:Product):number{
    return getSubTotal(product);
  }

  getTotalPrice(){
    // this.productInCart.subscribe((productList: Array<Product>) => {
    //     return productList.map(getSubTotal).reduce(getSum, 0);
    // })
  }

  trackByFn(index: number, product: Product){
    return product.id;
  }

  checkout(productInCart: Product[]){

    productInCart.forEach((product: Product) => {
      let resetToZeroQty: number = 0;

       this.productService.updateProductQty(
         product.id,resetToZeroQty
       )
    })

    this.productService.createOrderList(
        productInCart
      );

     console.log('we are navigating to checkout'); 
    this.router.navigate(['/check-out']);
    
  }
}