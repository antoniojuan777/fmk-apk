import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/Mensaje';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
import { UtilService } from 'src/app/servicio/util.service';
import { TipoDato } from 'src/app/clases/TipoDato';
import { ResponseGlobal } from 'src/app/clases/response/ResponseGlobal';
import { Empleo } from 'src/app/clases/Empleo';
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-empleo/ResponseDatosIniciales';

@Component({
  selector: 'app-empleo',
  templateUrl: './empleo.component.html',
  styleUrls: ['./empleo.component.css']
})
export class EmpleoComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  empleo: Empleo = new Empleo();

  empleoForm: FormGroup = this.fb.group({
    vEmpleo: ['', []],
    vDescripcionOtro: ['', []],
  });
  modoLectura: boolean = true;
  empleos: TipoDato[];
  habilitarSinEmpleo: boolean = true;
  habilitarEmpleo: boolean = true;
  habilitarOtro: boolean = true;
  habilitarDescripcionOtro: boolean;

  get f() { return this.empleoForm.controls; }

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private sesion: SesionService,
    private fmk: FmkService,
    private route: ActivatedRoute,
    private param: ParamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.mensaje = null;
    this.route.params.subscribe(async params => {
      this.modoLectura = !this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
      let parcero_id = params['parcero_id'];
      let resDatosIniciales: ResponseDatosIniciales;
      let reqDatosIniciales: { parcero_id: number };
      reqDatosIniciales = { parcero_id: parcero_id };
      try {
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-empleo/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      this.empleo = resDatosIniciales.empleo;
      this.empleos = resDatosIniciales.empleos;
      this.cargando = false;
      this.habilitaciones();
    });
  }
  habilitaciones() {
    if (this.empleo.nunca_empleado) {
      this.habilitarSinEmpleo = false;
      this.habilitarEmpleo = false;
      this.empleo.sin_empleo = false;
      this.habilitarOtro = false;
      this.empleo.empleo = null;
      this.empleo.otro = false;
      this.habilitarDescripcionOtro = false;
    }
    if (this.empleo.sin_empleo) {
      this.habilitarEmpleo = false;
      this.habilitarOtro = false;
      this.empleo.otro = false;
      this.empleo.empleo = null;
      this.habilitarDescripcionOtro = false;
    }
    if (this.empleo.otro) {
      this.habilitarDescripcionOtro = true;
      this.empleo.empleo = null;
      this.habilitarEmpleo = false;
      this.empleoForm.controls['vDescripcionOtro'].setValidators([Validators.required]);
      this.empleoForm.controls['vDescripcionOtro'].updateValueAndValidity();
    }
  }

  cambiarNuncaEmpleado() {
    this.empleo.nunca_empleado = !this.empleo.nunca_empleado;
    if (this.empleo.nunca_empleado) {
      this.habilitarSinEmpleo = false;
      this.habilitarEmpleo = false;
      this.empleo.sin_empleo = false;
      this.habilitarOtro = false;
      this.empleo.empleo = null;
      this.empleo.otro = false;
      this.habilitarDescripcionOtro = false;
      this.empleo.descripcion_otro = null;
      this.empleoForm.controls['vDescripcionOtro'].setValidators([]);
      this.empleoForm.controls['vDescripcionOtro'].updateValueAndValidity();
    } else {
      this.habilitarSinEmpleo = true;
      this.habilitarEmpleo = true;
      this.habilitarOtro = true;
    }
  }

  cambiarSinEmpleo() {
    this.empleo.sin_empleo = !this.empleo.sin_empleo;
    if (this.empleo.sin_empleo) {
      this.habilitarEmpleo = false;
      this.habilitarOtro = false;
      this.empleo.otro = false;
      this.empleo.empleo = null;
      this.habilitarDescripcionOtro = false;
      this.empleo.descripcion_otro = null;
      this.empleoForm.controls['vDescripcionOtro'].setValidators([]);
      this.empleoForm.controls['vDescripcionOtro'].updateValueAndValidity();
    } else {
      this.habilitarEmpleo = true;
      this.habilitarOtro = true;
      this.empleo.descripcion_otro = null;
    }
  }

  async guardar() {
    console.log('empleo', this.empleo);
    this.mensaje = null;
    if (this.util.validar(this.empleoForm)) {
      this.cargando = true;
      let resRegistroEmpleo: ResponseGlobal;
      let reqRegistrarEmpleo: { empleo: Empleo } = { empleo: this.empleo }
      try {
        resRegistroEmpleo = await this.fmk.postGlobal<ResponseGlobal>('/registro-empleo/registrar', reqRegistrarEmpleo).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroEmpleo.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroEmpleo.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', this.empleo.parcero_id]);
      } else {
        this.mensaje = new Mensaje(resRegistroEmpleo.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }

  cambiarOtro() {
    this.empleo.otro = !this.empleo.otro;
    if (this.empleo.otro) {
      this.habilitarDescripcionOtro = true;
      this.empleo.empleo = null;
      this.habilitarEmpleo = false;
      this.empleoForm.controls['vDescripcionOtro'].setValidators([Validators.required]);
    } else {
      this.habilitarEmpleo = true;
      this.empleo.descripcion_otro = null;
      this.habilitarDescripcionOtro = false;
      this.empleoForm.controls['vDescripcionOtro'].setValidators([]);
    }
    this.empleoForm.controls['vDescripcionOtro'].updateValueAndValidity();
  }
}
