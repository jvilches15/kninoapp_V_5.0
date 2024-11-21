import { TestBed } from '@angular/core/testing';

import { KninodbService } from './kninodb.service';

describe('KninodbService', () => {
  let service: KninodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KninodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
