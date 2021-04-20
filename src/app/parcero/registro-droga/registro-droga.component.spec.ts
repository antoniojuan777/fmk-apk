import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDrogaComponent } from './registro-droga.component';

describe('RegistroDrogaComponent', () => {
  let component: RegistroDrogaComponent;
  let fixture: ComponentFixture<RegistroDrogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDrogaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDrogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
