import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyValidators } from './../../../utils/validators';

import { UsersService } from './../../../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.status = 'loading';
      const value = this.form.value;
      this.usersService.create(value)
      .subscribe({
        next: () => {
          this.status = 'success';
          // this.form.reset();
        },
        error: () => {
          this.status = 'error';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
