import { MasterService } from './master.service';
import { FakeValueService } from './value-fake.service';
import { ValueService } from './value.service';

fdescribe('MasterService', () => {
  it('should return real value from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('real value');
  });

  it('should return fake value from a fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return real value from a fake object', () => {
    const fake = { getValue: () => 'fake value' };
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return real value from a spy', () => {
  const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
  valueServiceSpy.getValue.and.returnValue('spy value');
  const masterService = new MasterService(valueServiceSpy);
  expect(masterService.getValue()).toBe('spy value');
  expect(valueServiceSpy.getValue).toHaveBeenCalled();
  expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
