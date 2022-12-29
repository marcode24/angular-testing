import { Person } from "./person.model";

describe('test for person class', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('test', 'test', 30, 80, 1.80);
  });

  it('atributes should be defined', () => {
    expect(person.name).toBeDefined();
    expect(person.lastName).toBeDefined();
    expect(person.age).toBeDefined();
    expect(person.weight).toBeDefined();
    expect(person.height).toBeDefined();
  });

  describe('calculateIMC', () => {
    it('should return down', () => {
      person.weight = 50;
      person.height = 1.80;
      expect(person.calculateIMC()).toEqual('down');
    });

    it('should return normal', () => {
      person.weight = 60;
      person.height = 1.80;
      expect(person.calculateIMC()).toEqual('normal');
    });

    it('should return overweight', () => {
      person.weight = 80;
      person.height = 1.80;
      expect(person.calculateIMC()).toEqual('overweight');
    });

    it('should return overweight level 1', () => {
      person.weight = 95;
      person.height = 1.80;
      expect(person.calculateIMC()).toEqual('overweight level 1');
    });

    it('should return overweight level 2', () => {
      person.weight = 105;
      person.height = 1.80;
      expect(person.calculateIMC()).toEqual('overweight level 2');
    });

    it('should return overweight level 3', () => {
      person.weight = 130;
      person.height = 1.80;
      expect(person.calculateIMC()).toEqual('overweight level 3');
    });

    it('should return not found', () => {
      person.weight = 0;
      person.height = 0;
      expect(person.calculateIMC()).toEqual('not found');
    });
  });
});
