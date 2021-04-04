import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleParceroComponent } from './detalle-parcero.component';

describe('DetalleParceroComponent', () => {
  let component: DetalleParceroComponent;
  let fixture: ComponentFixture<DetalleParceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleParceroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleParceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
