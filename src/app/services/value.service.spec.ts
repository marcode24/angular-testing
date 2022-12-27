import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
    // service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getValue()', () => {
    it('should return real value', () => {
      expect(service.getValue()).toBe('real value');
    });
  });

  describe('test for setValue()', () => {
    it('should set the value to real value', () => {
      expect(service.getValue()).toBe('real value');
      service.setValue('other value');
      expect(service.getValue()).toBe('other value');
    });
  });

  describe('test for getPromiseValue()', () => {
    // this is an async test using async/await
    it('should return promise value', async () => {
      expect(await service.getPromiseValue()).toBe('promise value');
    });

    it('should return promise value', (done) => {
      // this is an async test using done
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        // this is required to tell Jasmine that the test is done
        done();
      });
    });
  });

  describe('test for getObservableValue()', () => {
    it('should return observable value', (done) => {
      // this is an async test using done
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        // this is required to tell Jasmine that the test is done
        done();
      });
    });
  });
});
