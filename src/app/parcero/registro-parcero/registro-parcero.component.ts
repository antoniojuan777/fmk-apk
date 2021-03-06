import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Parcero } from 'src/app/clases/Parcero';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-parcero/ResponseDatosIniciales';
import { ResponseRegistroParcero } from 'src/app/clases/response/parcero/registro-parcero/ResponseRegistroParcero';
import { TipoDato } from 'src/app/clases/TipoDato';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
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
      //Validators.pattern("(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/[0-9]{4}")
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
    vComentario: ['', [
      Validators.required
    ]],
  });
  modoLectura: boolean = true;

  get f() { return this.parceroForm.controls; }

  constructor(
    private fb: FormBuilder,
    private fmk: FmkService,
    private util: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    private sesion: SesionService,
    private param: ParamService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargando = true;
    this.mensaje = null;
    this.route.params.subscribe(async params => {
      this.modoLectura = !this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
      let parcero_id = params['parcero_id'];
      let resDatosIniciales: ResponseDatosIniciales;
      let reqDatosIniciales: { parcero_id: number };
      if (parcero_id) {
        reqDatosIniciales = { parcero_id: parcero_id };
      }
      try {
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-parcero/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      this.servicios = resDatosIniciales.servicios;
      this.formasContactos = resDatosIniciales.formasContactos;
      this.paises = resDatosIniciales.paises;
      if (parcero_id) {
        this.parcero = resDatosIniciales.parcero;
      }
      this.cargando = false;
    });
  }

  async guardar() {
    //console.log('Parcero',this.parcero);
    this.mensaje = null;
    if (this.util.validar(this.parceroForm)) {
      this.cargando = true;
      let resRegistroParcero: ResponseRegistroParcero;
      let reqRegistrarParcero: { parcero: Parcero } = { parcero: this.parcero }
      //console.log('reqParceroDatosIniciales', reqRegistrarParcero);
      try {
        resRegistroParcero = await this.fmk.postGlobal<ResponseRegistroParcero>('/registro-parcero/registrar', reqRegistrarParcero).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroParcero.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroParcero.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', resRegistroParcero.parcero.id]);
      } else {
        this.mensaje = new Mensaje(resRegistroParcero.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }

}
