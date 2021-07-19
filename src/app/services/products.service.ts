import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Product {
  id ?: string;
  title: string;
  price: number;
  imgUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: any;

  constructor(private db: AngularFirestore)  { 
  }

  get productsCollectionRef() {
    return this.db.collection('products');
  }

  addProduct(product: Product) {
    return this.db.collection('products').add(product)
  }

  updateProductQty(product:Product, qty:number){
    this.productsCollectionRef.doc(product.id).update({
      qtyInCart: qty
    });
  }

  incrementQtyInCart(product: Product){
      console.log('collection', this.productsCollectionRef.get());

  }

  loadProducts(){
    let productsRef = this.db.collection('products');

    productsRef.valueChanges().subscribe(doc => {
      console.log('products', doc );
      
    });

  }

  getProducts(){
    console.log('collection',this.db.collection('products').valueChanges({ idField: 'id' }));
    return this.db.collection('products').valueChanges({ idField: 'id' });
  }



}
