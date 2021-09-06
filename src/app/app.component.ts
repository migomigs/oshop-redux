import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductsService } from './services/products.service';
import { IAppState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'oshop-my-version';

  constructor(private productsService: ProductsService){

  }

  ngOnInit(){
    this.productsService.loadProducts();
  //   this.productsService.getProducts().subscribe(result => {

  //     this.ngRedux.dispatch({type: 'LOAD_PRODUCTS', payload: result});

  //    }, error => {
  //  })   
  }

}
