import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'add-to-cart-widget',
  templateUrl: './add-to-cart-widget.component.html',
  styleUrls: ['./add-to-cart-widget.component.css']
})
export class AddToCartWidgetComponent implements OnInit {

  @Input('qtyInCart') qtyInCart !: number;
  @Output('qtyChange') qtyChange = new EventEmitter();
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  addQty(){
    this.qtyChange.emit(String(this.qtyInCart+1));
  }

}
