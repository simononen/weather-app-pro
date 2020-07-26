import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { injectSpy } from 'angular-unit-test-helper';
import { of } from 'rxjs';

import { WeatherService } from '../weather/weather.service';
import { fakeWeather } from '../weather/weather.service.fake';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;
  const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CurrentWeatherComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents();

    weatherServiceMock = injectSpy(WeatherService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should get current weather from the weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    // Act
    fixture.detectChanges(); // trigers ngOnInit

    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.current).toBeDefined();
    expect(component.current.city).toEqual('Bethesda');
    expect(component.current.temperature).toEqual(280.32);

    // Assert on DOM
    const debugEL = fixture.debugElement;
    const titleEL: HTMLElement = debugEL.query(By.css('span')).nativeElement;

    expect(titleEL.textContent).toContain('Bethesda');
  });
});
