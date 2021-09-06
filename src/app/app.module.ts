import { NgModule, isDevMode } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductProfileComponent } from './product-profile/product-profile.component';
import { AddToCartWidgetComponent } from './add-to-cart-widget/add-to-cart-widget.component';
import { ProductWidgetComponent } from './product-widget/product-widget.component';
import { NgRedux, NgReduxModule, DevToolsExtension} from '@angular-redux/store';
import {IAppState, initState, rootReducer} from './store';
import { Reducer } from 'redux';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartNavComponent } from './cart-nav/cart-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ProductGuardService } from './product-guard.service';
import { applyMiddleware, compose } from "redux";
import {composeWithDevTools, devToolsEnhancer} from 'redux-devtools-extension';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import firebase from "firebase/app";
import { ProductsService } from './services/products.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const appRoutes: Routes = [
  
  {path: '', component: ProductListComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent,
      },
  {path: 'check-out', component: CheckOutComponent,
      canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'order-success/:orderDocId', component: OrderSuccessComponent,
      canActivate:[AuthGuard]},
  {path: 'admin/orders', component: OrderAdminComponent,
      canActivate:[AuthGuard]},
  {path: 'admin/my-orders', component: MyOrdersComponent,
      canActivate:[AuthGuard]},
  {path: 'admin/products', component: ProductAdminComponent,
      canActivate:[AuthGuard]},
  {path: 'admin/products/id:', component: UpdateProductComponent,
      canActivate:[AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    CategoriesComponent,
    ProductListComponent,
    UpdateProductComponent,
    ProductProfileComponent,
    AddToCartWidgetComponent,
    ProductWidgetComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    LoginComponent,
    OrderSuccessComponent,
    OrderAdminComponent,
    ProductAdminComponent,
    PageNotFoundComponent,
    ShippingDetailsComponent,
    OrderSummaryComponent,
    CartNavComponent,
    NavHomeComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    NgReduxModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ], 
  providers: [
    AuthService,
    ProductsService
    ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension){

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    //TODO:  Resolve warning in this part 
    //https://www.mydatahack.com/getting-redux-devtools-to-work-with-typescript/

    var enhancers = isDevMode() ? [devTools.enhancer()] : [];
    // var enhancers = isDevMode() ? [composeEnhancers()] : [];

    // ngRedux.configureStore(rootReducer as Reducer, initState, [], enhancers);
    ngRedux.configureStore(rootReducer as Reducer, initState, [], enhancers);
    firebase.initializeApp(environment.firebase)
  }
}

