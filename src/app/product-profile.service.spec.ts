import { TestBed } from '@angular/core/testing';

import { ProductProfileService } from './product-profile.service';

describe('ProductProfileService', () => {
  let service: ProductProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
