import { TestBed, inject } from '@angular/core/testing';

import { AirtrafficService } from './airtraffic.service';

describe('AirtrafficService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirtrafficService]
    });
  });

  it('should be created', inject([AirtrafficService], (service: AirtrafficService) => {
    expect(service).toBeTruthy();
  }));
});
