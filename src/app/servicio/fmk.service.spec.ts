import { TestBed } from '@angular/core/testing';

import { FmkService } from './fmk.service';

describe('FmkService', () => {
  let service: FmkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FmkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
