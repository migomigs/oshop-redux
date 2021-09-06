import { TestBed } from '@angular/core/testing';

import { CheckoutAuthGuardService } from './checkout-auth-guard.service';

describe('CheckoutAuthGuardService', () => {
  let service: CheckoutAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
