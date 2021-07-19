import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList !: any;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (result) =>{
       this.productList =  result;
      console.log('list value changes', this.productList);
      console.log('try to capture doc id', );
    });
  }

  log(product: any){
     console.log('product', product);
  }

  updateQty(product: Product, qty: string){

    console.log('Product', product);
    console.log('New qty', qty);
    this.productsService.updateProductQty(product, parseInt(qty));
  }

  

}
