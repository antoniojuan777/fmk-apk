import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRespuestaResultadoComponent } from './registro-respuesta-resultado.component';

describe('RegistroRespuestaResultadoComponent', () => {
  let component: RegistroRespuestaResultadoComponent;
  let fixture: ComponentFixture<RegistroRespuestaResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroRespuestaResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRespuestaResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
