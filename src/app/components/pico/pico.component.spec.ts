import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicoComponent } from './pico.component';

describe('PicoComponent', () => {
  let component: PicoComponent;
  let fixture: ComponentFixture<PicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
