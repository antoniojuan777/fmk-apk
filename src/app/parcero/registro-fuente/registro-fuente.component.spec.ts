import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFuenteComponent } from './registro-fuente.component';

describe('RegistroFuenteComponent', () => {
  let component: RegistroFuenteComponent;
  let fixture: ComponentFixture<RegistroFuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFuenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
