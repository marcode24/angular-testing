import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('test','test',1,1,1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "test"', () => {
    component.person = new Person('ejemplo', 'test', 1, 1, 1);
    expect(component.person.name).toEqual('ejemplo');
  });

  it('should have <h3> with "Hola, {{ person.name }}"', () => {
    component.person = new Person('Nombre', 'test', 1, 1, 1);
    const expectMsg = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const personElement: HTMLElement = h3Debug.nativeElement;
    fixture.detectChanges();
    expect(personElement?.textContent).toEqual(expectMsg);
  });

  it('should have <p> with "Mi altura es, {{ person.height }}"', () => {
    component.person = new Person('Nombre', 'test', 1, 1, 1);
    const expectMsg = `Mi altura es, ${component.person.height}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const personElement: HTMLElement = pDebug.nativeElement;
    fixture.detectChanges();
    expect(personElement?.textContent).toEqual(expectMsg);
  });


  // it('should have a <p> with "mi parrafo"', () => {
  //   const personDebug: DebugElement = fixture.debugElement;
  //   const pDebug: DebugElement = personDebug.query(By.css('p'));
  //   const personElement: HTMLElement = pDebug.nativeElement;
  //   // const personElement: HTMLElement = personDebug.nativeElement;
  //   // const personElement: HTMLElement = fixture.nativeElement;
  //   // const p = personElement.querySelector('p');
  //   expect(personElement?.textContent).toEqual('mi parrafo');
  // });


  it('should display a text with IMC when call IMC method', () => {
    const expectMsg = `overweight level 3`;
    component.person = new Person('Nombre', 'test', 30, 120, 1.65); // overweight level 3
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    component.calcImc();
    fixture.detectChanges();
    expect(button.textContent).toContain(expectMsg);
  });

  it('should display a text with IMC when click on button', () => {
    const expectMsg = `overweight level 3`;
    component.person = new Person('Nombre', 'test', 30, 120, 1.65); // overweight level 3
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(buttonElement.textContent).toContain(expectMsg);
  });

  it('should raise selected event when clicked', () => {
    const expectPerson = new Person('Nombre', 'test', 30, 120, 1.65);
    component.person = expectPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person: Person) => selectedPerson = person);
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(selectedPerson).toEqual(expectPerson);
  });
});

@Component({
  template: `
    <app-person
      [person]="person"
      (onSelected)="onSelected($event)">
    </app-person>`,
})
class HostComponent {
  person: Person = new Person('test','test',1,1,1);
  selectedPerson: Person | undefined;
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent, HostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    const expectName = component.person.name;
    const h3Debug: DebugElement = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    fixture.detectChanges();
    expect(h3Element.textContent).toContain(expectName);
  });

  it('should raise selected event when clicked', () => {
    const buttonDebug = fixture.debugElement.query(By.css('app-person button.btn-choose'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.person);
  });
});
