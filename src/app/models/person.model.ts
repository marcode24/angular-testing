export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number,
  ) {}

  calculateIMC(): string {
    const imc = Math.round(this.weight / (this.height * this.height));
    if(imc >= 0 && imc <= 18) {
      return 'down';
    } else if(imc >= 19 && imc <= 24) {
      return 'normal';
    } else if(imc >= 25 && imc <= 26) {
      return 'overweight';
    } else if(imc >= 27 && imc <= 29) {
      return 'overweight level 1';
    } else if(imc >= 30 && imc <= 39) {
      return 'overweight level 2';
    } else if(imc >= 40) {
      return 'overweight level 3';
    } else {
      return 'not found';
    }
  }

}
