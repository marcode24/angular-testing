import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { asyncData, asyncError, clickElement, clickEvent, getText, mockObservable, query, queryById, setInputCheckoxValue, setInputValue } from 'src/testing';
import { generateOneUser } from 'src/app/models/user.mock';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['create', 'isAvailableByEmail']);
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: UsersService, useValue: spy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    component = fixture.componentInstance;
    userService.isAvailableByEmail.and.returnValue(mockObservable({isAvailable: true}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the email field be invalid', () => {
    component.emailField?.setValue('test');
    expect(component.emailField?.valid).toBeFalsy();

    component.emailField?.setValue(' ');
    expect(component.emailField?.valid).toBeFalsy();
  });

  it('should the password field be invalid', () => {
    component.passwordField?.setValue('test');
    expect(component.passwordField?.invalid).toBeTruthy();

    component.passwordField?.setValue(' ');
    expect(component.passwordField?.invalid).toBeTruthy();

    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: false
    });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should the email field be valid from UI', () => {
    const inputDebug = query(fixture, 'input#email');
    const inputElement: HTMLInputElement = inputDebug.nativeElement;
    inputElement.value = 'nombre test';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).withContext('wrong text error').toContain("*It's not a email");
  });

  it('should the email field be valid from UI with setInputValue', () => {
    setInputValue(fixture, 'input#email', 'nombre test');
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).withContext('wrong text error').toContain("*It's not a email");
  });

  it('should send the form successfully', () => {
    component.form.patchValue({
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(mockObservable(mockUser));
    component.register(new Event('submit'));
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  });

  it('should send the form successfully and "loading" => "success"', fakeAsync(() => {
    component.form.patchValue({
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));
    component.register(new Event('submit'));
    expect(component.status).toBe('loading');
    tick();
    fixture.detectChanges();
    expect(component.status).toBe('success');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should send the form successfully from UI and "loading" => "error"', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'test');
    setInputValue(fixture, 'input#email', 'ejemplo@test.com');
    setInputValue(fixture, 'input#password', '123456');
    setInputValue(fixture, 'input#confirmPassword', '123456');
    setInputCheckoxValue(fixture, 'input#terms', true);
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));
    // clickEvent(fixture, 'btn-submit', true);
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    clickElement(fixture, 'btn-submit', true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading');

    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should send the form from UI with error in service', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'test');
    setInputValue(fixture, 'input#email', 'ejemplo@test.com');
    setInputValue(fixture, 'input#password', '123456');
    setInputValue(fixture, 'input#confirmPassword', '123456');
    setInputCheckoxValue(fixture, 'input#terms', true);
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncError(mockUser));
    // clickEvent(fixture, 'btn-submit', true);
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    clickElement(fixture, 'btn-submit', true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading');

    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('error');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should show error with an invalid email', () => {
    userService.isAvailableByEmail.and.returnValue(mockObservable({isAvailable: false}));
    setInputValue(fixture, 'input#email', 'test@gmail.com');
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();
    expect(userService.isAvailableByEmail).toHaveBeenCalledWith('test@gmail.com');

    const textError = getText(fixture, 'emailField-not-available');
    expect(textError).withContext('wrong text error').toContain('email already registered');
  });
});
