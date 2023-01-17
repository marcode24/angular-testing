import { Component } from '@angular/core';
import { ReversePipe } from './reverse.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input type="text" [(ngModel)]="text">
    <p>{{ text | reverse }}</p>
  `
})
class HostComponent {
  text: string = '';
}

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('roma')).toBe('amor');
  });
});

describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, ReversePipe ],
      imports: [ FormsModule ]
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

  it('should the h5 be "roma"', () => {
    const h5 = fixture.debugElement.query(By.css('h5'));
    expect(h5.nativeElement.textContent).toBe('roma');
  });

  it('should apply the pipe to the input when typing', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const pDebug = fixture.debugElement.query(By.css('p'));
    expect(pDebug.nativeElement.textContent).toBe('');
    inputDebug.nativeElement.value = 'roma oso';
    inputDebug.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(pDebug.nativeElement.textContent).toBe('oso amor');
  });
});
