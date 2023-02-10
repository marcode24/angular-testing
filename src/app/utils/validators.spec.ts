import { FormControl, FormGroup } from "@angular/forms";
import { MyValidators } from "./validators";
import { UsersService } from "../services/user.service";
import { mockObservable } from "src/testing";

describe('Test for MyValidators', () => {
  describe('Test for validPassword', () => {
    it('should return null if password is valid', () => {
      const control = new FormControl();
      control.setValue('123456');
      const result = MyValidators.validPassword(control);
      expect(result).toBeNull();
    });

    it('should return {invalid_password: true} if password is invalid', () => {
      const control = new FormControl();
      control.setValue('abbbsss');
      const result = MyValidators.validPassword(control);
      expect(result?.invalid_password).toBeTruthy();
    });
  });

  describe('Test for matchPasswords', () => {
    it('should return null if passwords are equal', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456'),
      });
      const result = MyValidators.matchPasswords(group);
      expect(result).toBeNull();
    });

    it('should return {match_password: true} if passwords are not equal', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('1234567'),
      });
      const result = MyValidators.matchPasswords(group);
      expect(result?.match_password).toBeTruthy();
    });

    it('should return obj with the error', () => {
      const group = new FormGroup({
        otro: new FormControl('123456'),
        otro2: new FormControl('1234567'),
      });
      const fn = () => MyValidators.matchPasswords(group);
      expect(fn).toThrow(new Error("Passwords fields not found"));
    })
  });

  describe('Test for validateEmailAsync', () => {
    it('should return null if email is available', (doneFn) => {
      const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('UsersService', ['isAvailableByEmail']);
      const control = new FormControl('ejemplo@gmail.com');

      userService.isAvailableByEmail.and.returnValue(mockObservable({isAvailable: true}));

      const validator = MyValidators.validateEmailAsync(userService);
      validator(control).subscribe((result) => {
        expect(result).toBeNull();
        doneFn();
      });
    });
  });
});
