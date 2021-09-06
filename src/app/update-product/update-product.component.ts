import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product !: Product

  form = new FormGroup({
    title: new FormControl(),
    price: new FormControl(),
    imgUrl: new FormControl(),
  });

  constructor(private productsService: ProductsService) {

   }
  
  

  ngOnInit(): void {
  }

  public get title():string {
    return this.form.get('title')?.value;
  }

  public get price():number {
    return this.form.get('price')?.value;
  }
  public get imgUrl():string {
    // return this.form.get('imgUrl')?.value;
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff";
  }

  submitForm(){
    let newProduct: Product = {
      id: '',
      title:  this.form.get('title')?.value,
      price:  this.form.get('price')?.value,
      imgUrl: this.form.get('imgUrl')?.value,
      qtyInCart: 0
    }

    this.productsService.addProduct(newProduct)
  }
}
