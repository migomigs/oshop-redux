import { NgRedux, select } from '@angular-redux/store';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { AppError } from '../common/app-error';
import { Product, ProductsService } from '../services/products.service';
import { DataState, IAppState } from '../store';

const getErrorType = (state: IAppState): string | null=>{
  return typeof state.dataState.error;
}

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @select('productList') productList$ !:Observable<Product[]>;
  @select('dataState') dataState$ !: Observable<DataState>;
  @select(['dataState, error']) error$ !: Observable<AppError>;
  constructor(private productsService: ProductsService,
   private ngRedux: NgRedux<IAppState>
    ) { }

  ngOnInit(): void {

  }

  trackByFn(index: number, product: any): number {
    return product.serialNumber;
 }

}
