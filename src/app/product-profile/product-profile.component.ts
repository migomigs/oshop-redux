import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.css']
})
export class ProductProfileComponent implements OnInit {

  @Input('title') title !: string;
  @Input('price') price !: number;
  @Input('imgUrl') imgUrl !: string;

  constructor() {   
  }

  ngOnInit(): void {
    
  }



}
