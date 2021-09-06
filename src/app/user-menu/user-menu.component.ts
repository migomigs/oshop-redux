import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  isDisplayed: boolean = true;

  constructor() { }

  ngOnInit(): void {

  }

  toggleDisplay(){
    this.isDisplayed = !this.isDisplayed;
  }



}
