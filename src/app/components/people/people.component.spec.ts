import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/models/person.model';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person component', () => {
    component.people = [
      new Person('test','test',1,1,1),
      new Person('test2','test2',2,150, 1.5),
      new Person('test3','test3',2,150, 1.5),
    ];
    fixture.detectChanges();
    const personDebug = fixture.debugElement.queryAll(By.css('app-person'));
    expect(personDebug.length).toEqual(3);
  });

  it('should raise selectedPerson when clicked', () => {
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selectedPerson', () => {
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('.selected-person ul > li'));
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(debugElement.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });
});
