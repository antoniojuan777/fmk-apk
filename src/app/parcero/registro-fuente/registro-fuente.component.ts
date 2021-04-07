import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { Fuente } from 'src/app/clases/Fuente';
import { Mensaje } from 'src/app/clases/Mensaje';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-fuente/ResponseDatosIniciales';
import { ResponseGlobal } from 'src/app/clases/response/ResponseGlobal';
import { TipoDato } from 'src/app/clases/TipoDato';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
import { UtilService } from 'src/app/servicio/util.service';

@Component({
  selector: 'app-registro-fuente',
  templateUrl: './registro-fuente.component.html',
  styleUrls: ['./registro-fuente.component.css']
})
export class RegistroFuenteComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  fuente: Fuente = new Fuente();
  mediosConocimientosOrgs: TipoDato[];
  relacionesPacientes: TipoDato[];

  fuenteForm: FormGroup = this.fb.group({
    vNombresApellidos: ['', [
      Validators.required,
      Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð \',.-]{2,48}[a-z]{2}')
    ]],
    vCelular: ['', [
      Validators.pattern('^[0-9]+'),
      Validators.minLength(8),
      Validators.maxLength(8)
    ]],
    vEdad: ['', [
      Validators.pattern('^[0-9]+'),
      Validators.min(1),
      Validators.max(150)
    ]],
    vGenero: ['', [
      Validators.required
    ]],
    vMedioConocimientoOrg: ['', []],
    vRelacionPaciente: ['', []],
  });
  modoLectura: boolean = true;

  get f() { return this.fuenteForm.controls; }

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
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-fuente/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }

      this.fuente = resDatosIniciales.fuente;
      this.mediosConocimientosOrgs = resDatosIniciales.mediosConocimientosOrgs;
      this.relacionesPacientes = resDatosIniciales.relacionesPacientes;

      this.cargando = false;
    });
  }

  async guardar() {
    console.log('Fuente', this.fuente);
    this.mensaje = null;
    if (this.util.validar(this.fuenteForm)) {
      this.cargando = true;
      let resRegistroFuente: ResponseGlobal;
      let reqRegistrarFuente: { fuente: Fuente } = { fuente: this.fuente }
      try {
        resRegistroFuente = await this.fmk.postGlobal<ResponseGlobal>('/registro-fuente/registrar', reqRegistrarFuente).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroFuente.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroFuente.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', this.fuente.parcero_id]);
      } else {
        this.mensaje = new Mensaje(resRegistroFuente.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }
}
