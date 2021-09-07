import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  constructor(private productService: ProductsService) { }
  @select('productList') productList$ !: Observable<Product[]>;

  ngOnInit(): void {
    this.productService.loadProducts();
  }

}
