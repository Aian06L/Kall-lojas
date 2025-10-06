import { TestBed } from '@angular/core/testing';

import { LooksService } from './looks.service';

describe('LooksService', () => {
  let service: LooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
