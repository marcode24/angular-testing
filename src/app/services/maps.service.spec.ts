import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });
    mapService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  describe('getCurrentPosition method', () => {
    it('should save the center coordinates', () => {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const geolocationMock = {
          coords: {
            latitude: 100,
            longitude: 200,
            speed: 0,
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
          },
          timestamp: 0,
        };
        successFn(geolocationMock);
      });
      mapService.getCurrentPosition();
      expect(mapService.center).toEqual({ lat: 100, lng: 200 });
    });
  });
});
