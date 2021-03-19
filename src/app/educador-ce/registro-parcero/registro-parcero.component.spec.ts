import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroParceroComponent } from './registro-parcero.component';

describe('RegistroParceroComponent', () => {
  let component: RegistroParceroComponent;
  let fixture: ComponentFixture<RegistroParceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroParceroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroParceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
