import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
// import { FakeValueService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should return real value from the real service', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('real value');
  // });

  // it('should return fake value from a fake service', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(fakeValueService as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });

  // it('should return real value from a fake object', () => {
  //   const fake = { getValue: () => 'fake value' };
  //   const masterService = new MasterService(fake as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });

  it('should return real value from a spy', () => {
  // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
  valueServiceSpy.getValue.and.returnValue('spy value');
  // const masterService = new MasterService(valueServiceSpy);
  expect(masterService.getValue()).toBe('spy value');
  expect(valueServiceSpy.getValue).toHaveBeenCalled();
  expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
