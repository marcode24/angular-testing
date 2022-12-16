import { Calculator } from "./calculator";

describe('Test for Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should multiply two numbers', () => {
    const result = calculator.multiply(2, 3);
    expect(result).toEqual(6);
  });

  it('should divide two numbers', () => {
    const result = calculator.divide(4, 2);
    expect(result).toEqual(2);
  });

  it('should return null when dividing by zero', () => {
    const result = calculator.divide(2, 0);
    expect(result).toBeNull();
  });
});
