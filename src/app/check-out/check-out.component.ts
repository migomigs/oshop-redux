import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth/auth.service';
import { AppError } from '../common/app-error';
import { Product, ProductsService } from '../services/products.service';
import { IAppState, User } from '../store';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  @select('orderList') orderList$ !: Observable<Product[]>;
  @select('error') error$ !: Observable<AppError[]>;
  orderId !: string;
  error : AppError | null = null;
  
  constructor(private authService: AuthService, 
    private productService: ProductsService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
    ) {}

  ngOnInit(): void {
  }

  async placeOrder(orderList: Product[]){
    this.error = null;
    let uid = this.authService.currentUser?.uid;

    if(uid && orderList.length > 0){
      let user: User = {
        uid: uid,
        name: "test",
        address: "test",
        city: "test"
      };

      await this.productService.sendOrder(user, orderList)
        .then((orderDocRef: DocumentReference) => {
          if(orderDocRef.id){
             this.orderId = orderDocRef.id;
              this.ngRedux.dispatch({
                type: 'CLEAR_ORDER_LIST',
                payload: {
                  orderList: []
                }
              })
           }
        })
        .catch(error =>{
            this.error = new AppError(error);
        });
      
        this.router.navigate(['/order-success', this.orderId])
    }else{
      this.error = new AppError(this.error);
    }

    }

}
