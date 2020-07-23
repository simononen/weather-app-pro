import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { WeatherServiceFake } from './weather.service.fake';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WeatherService, useClass: WeatherServiceFake }],
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
