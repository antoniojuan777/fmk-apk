import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoMensaje } from 'src/app/clases/Constantes';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Parcero } from 'src/app/clases/Parcero';
import { RequestParceroDatosIniciales } from 'src/app/clases/request/RequestParceroDatosIniciales';
import { ResponseDatosIniciales } from 'src/app/clases/response/registro-parcero/ResponseDatosIniciales';
import { ResponseRegistroParcero } from 'src/app/clases/response/registro-parcero/ResponseRegistroParcero';
import { ResponseGlobal } from 'src/app/clases/response/ResponseGlobal';
import { TipoDato } from 'src/app/clases/TipoDato';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { UtilService } from 'src/app/servicio/util.service';

@Component({
  selector: 'app-registro-parcero',
  templateUrl: './registro-parcero.component.html',
  styleUrls: ['./registro-parcero.component.css']
})
export class RegistroParceroComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  parcero: Parcero = new Parcero();
  servicios: TipoDato[];
  formasContactos: TipoDato[];
  paises: TipoDato[];

  parceroForm: FormGroup = this.fb.group({
    vFechaContacto: ['', [
      Validators.pattern("(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/[0-9]{4}")
    ]],
    vHoraContacto: ['', []],
    vInstitucion: ['', []],
    vServicio: ['', []],
    vFormaContacto: ['', []],
    vNombres: ['', [
      Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð \',.-]{2,48}[a-z]{2}')
    ]],
    vApellidos: ['', [
      Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]{2,64}')
    ]],
    vApodo: ['', []],
    vEdad: ['', [
      Validators.pattern('^[0-9]+'),
      Validators.min(1),
      Validators.max(150)
    ]],
    vGenero: ['', [
      Validators.required
    ]],
    vCelular: ['', [
      Validators.pattern('^[0-9]+'),
      Validators.minLength(8),
      Validators.maxLength(8)
    ]],
    vPais: ['', []],
    vCiudad: ['', []],
    vCalle: ['', []],
    vComentario: ['', []],
  });

  get f() { return this.parceroForm.controls; }

  constructor(
    private fb: FormBuilder,
    private fmk: FmkService,
    private util: UtilService,
    private router: Router,
    private param: ParamService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargando = true;
    let resDatosIniciales: ResponseDatosIniciales;
    try {
      resDatosIniciales = await this.fmk.getGlobal<ResponseDatosIniciales>('/registro-parcero/datos-iniciales').toPromise();
    } catch (error) {
      this.fmk.verificarSesion(error);
      this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
      this.cargando = false;
      return;
    }
    this.servicios = resDatosIniciales.servicios;
    this.formasContactos = resDatosIniciales.formasContactos;
    this.paises = resDatosIniciales.paises;
    this.cargando = false;
  }

  async guardar() {
    //console.log('Parcero',this.parcero);
    this.mensaje = null;
    if (this.util.validar(this.parceroForm)) {
      this.cargando = true;
      let resDatosIniciales: ResponseRegistroParcero;
      let reqParceroDatosIniciales: RequestParceroDatosIniciales = new RequestParceroDatosIniciales(this.parcero);
      console.log('reqParceroDatosIniciales',reqParceroDatosIniciales);
      try {
        resDatosIniciales = await this.fmk.postGlobal<ResponseRegistroParcero>('/registro-parcero/registrar', reqParceroDatosIniciales).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resDatosIniciales.ok) {
        this.param.set('parcero', resDatosIniciales.parcero);
        this.param.set('mensaje', new Mensaje(resDatosIniciales.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero']);
      } else {
        this.mensaje = new Mensaje(resDatosIniciales.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }
}
