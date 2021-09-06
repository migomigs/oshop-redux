import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.css']
})
export class ProductWidgetComponent implements OnInit {

  @Input('title') title !: string;
  @Input('price') price !: number;
  @Input('imgUrl') imgUrl !: string;
  @Input('qtyInCart') qtyInCart !: number;
  @Input('productId') productId !: string;
  constructor() { }

  ngOnInit(): void {
  }

}
