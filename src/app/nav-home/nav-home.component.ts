import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs/internal/Observable';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.css']
})
export class NavHomeComponent implements OnInit {

  faLeaf = faLeaf;
  @select('orderList') orderList$ !: Observable<Product[]>;
  
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  loadState(){
    let subscription = this.orderList$.subscribe((orderList:Product[]) =>{
           this.productService.returnOrderToCartList(orderList);
    });
    subscription.unsubscribe();
  }

}
