import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenParceroComponent } from './imagen-parcero.component';

describe('ImagenParceroComponent', () => {
  let component: ImagenParceroComponent;
  let fixture: ComponentFixture<ImagenParceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenParceroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenParceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
