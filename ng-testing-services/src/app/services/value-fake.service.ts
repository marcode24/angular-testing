export class FakeValueService {

  private value = 'real value';

  constructor() { }

  getValue() {
    return 'fake value';
  }

  setValue(value: string) {
  }

  getPromiseValue() {
    return Promise.resolve('fake promise value');
  }

}
