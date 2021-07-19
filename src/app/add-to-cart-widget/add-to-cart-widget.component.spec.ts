import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartWidgetComponent } from './add-to-cart-widget.component';

describe('AddToCartWidgetComponent', () => {
  let component: AddToCartWidgetComponent;
  let fixture: ComponentFixture<AddToCartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
