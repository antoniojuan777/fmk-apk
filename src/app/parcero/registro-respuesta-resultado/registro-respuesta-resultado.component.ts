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
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { Respuesta } from 'src/app/clases/Respuesta';
import { Resultado } from 'src/app/clases/response/Resultado';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-respuesta-resultado/ResponseDatosIniciales';

@Component({
  selector: 'app-registro-respuesta-resultado',
  templateUrl: './registro-respuesta-resultado.component.html',
  styleUrls: ['./registro-respuesta-resultado.component.css']
})
export class RegistroRespuestaResultadoComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  respuesta: Respuesta = new Respuesta();
  resultado: Resultado = new Resultado();

  respuestaForm: FormGroup = this.fb.group({

  });

  resultadoForm: FormGroup = this.fb.group({
    vResultado: ['', []],
    vDescripcionOtro: ['', []],
  });

  modoLectura: boolean = true;
  resultados: TipoDato[];
  habilitarResultado: boolean = true;
  habilitarDescripcionOtro: boolean = false;

  get frta() { return this.respuestaForm.controls; }
  get frdo() { return this.resultadoForm.controls; }

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
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-respuesta-resultado/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      this.respuesta = resDatosIniciales.respuesta;
      this.resultado = resDatosIniciales.resultado;
      this.resultados = resDatosIniciales.resultados;
      this.cargando = false;
      this.habilitaciones();
    });
  }

  habilitaciones() {
    if (this.resultado.otro) {
      this.habilitarDescripcionOtro = true;
      this.resultado.resultado = null;
      this.habilitarResultado = false;
      this.resultadoForm.controls['vDescripcionOtro'].setValidators([Validators.required]);
      this.resultadoForm.controls['vDescripcionOtro'].updateValueAndValidity();
    } else {
      this.habilitarDescripcionOtro = false;
      this.habilitarResultado = true;
      this.resultado.descripcion_otro = null;
      this.resultadoForm.controls['vDescripcionOtro'].setValidators([]);
      this.resultadoForm.controls['vDescripcionOtro'].updateValueAndValidity();
    }
  }

  cambiarOtro() {
    this.resultado.otro = !this.resultado.otro;
    this.habilitaciones();
  }

  async guardar() {
    console.log('respuesta', this.respuesta);
    console.log('resultado', this.resultado);
    this.mensaje = null;
    if (this.util.validar(this.resultadoForm) && this.util.validar(this.respuestaForm)) {
      this.cargando = true;
      let resRegistroRespuestaResultado: ResponseGlobal;
      let reqRegistrarRespuestaResultado: { respuesta: Respuesta, resultado: Resultado } = { respuesta: this.respuesta, resultado: this.resultado }
      try {
        resRegistroRespuestaResultado = await this.fmk.postGlobal<ResponseGlobal>('/registro-respuesta-resultado/registrar', reqRegistrarRespuestaResultado).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroRespuestaResultado.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroRespuestaResultado.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', this.respuesta.parcero_id]);
      } else {
        this.mensaje = new Mensaje(resRegistroRespuestaResultado.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }

}
