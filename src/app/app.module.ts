import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
