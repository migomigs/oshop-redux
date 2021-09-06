import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IAppState } from '../store';

@Component({
  selector: 'add-to-cart-widget',
  templateUrl: './add-to-cart-widget.component.html',
  styleUrls: ['./add-to-cart-widget.component.css']
})
export class AddToCartWidgetComponent implements OnInit {

  @Input('qtyInCart') qtyInCart !: number;
  @Input('productId') productId !: string;
  constructor(private productsService: ProductsService,
     private ngRedux: NgRedux<IAppState>) { }

  ngOnInit(): void {
    
  }

  incrementQtyInCart(qty:number){

    this.productsService.updateProductQty(this.productId, this.qtyInCart+1);
  }

  decrementQtyInCart(){

    this.productsService.updateProductQty(this.productId, this.qtyInCart-1);
  }

}
