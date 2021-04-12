import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPeticionComponent } from './registro-peticion.component';

describe('RegistroPeticionComponent', () => {
  let component: RegistroPeticionComponent;
  let fixture: ComponentFixture<RegistroPeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPeticionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
