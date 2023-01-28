import { Component } from '@angular/core';
import { HighligthDirective } from './highligth.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { queryAllByDirective } from 'src/testing';

@Component({
  template: `
  <h5 class="title" highligth>Valor</h5>
  <h5 highligth="yellow">Valor yellow</h5>
  <p highligth="pink">Valor yellow</p>
  <p>este no tiene directiva</p>
  <input type="text" [highligth]="color" [(ngModel)]="color">
  `,
})
class HostComponent {
  color = 'green';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highlighted elements', () => {
    // const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elements = queryAllByDirective(fixture, HighligthDirective);
    const elementsWithoutDirective = fixture.debugElement.queryAll(By.css('*:not([highligth])'));
    expect(elements.length).toBe(4);
    expect(elementsWithoutDirective.length).toBe(2);
  });

  it('should the elements be matched with the directive', () => {
    // const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elements = queryAllByDirective(fixture, HighligthDirective);
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('pink');
  });

  it('should h5.title be defaultColor', () => {
    const titleDebug = fixture.debugElement.query(By.css('h5.title'));
    const dir = titleDebug.injector.get(HighligthDirective);
    expect(titleDebug.nativeElement.style.backgroundColor).toBe(dir.defaultColor);
  });

  it('should bind the color to the input and change color', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDebug.nativeElement;
    expect(inputEl.style.backgroundColor).toBe('green');
    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.style.backgroundColor).toBe('red');
    expect(component.color).toBe('red');
  });
});
