import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCondicionComponent } from './registro-condicion.component';

describe('RegistroCondicionComponent', () => {
  let component: RegistroCondicionComponent;
  let fixture: ComponentFixture<RegistroCondicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCondicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
