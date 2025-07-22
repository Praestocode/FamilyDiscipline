import { TestBed } from '@angular/core/testing';

import { CryptoServiceTsService } from './crypto.service.ts.service';

describe('CryptoServiceTsService', () => {
  let service: CryptoServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
