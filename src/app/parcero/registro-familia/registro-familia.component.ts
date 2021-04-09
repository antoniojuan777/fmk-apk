import { Component, OnInit } from '@angular/core';
import { Familia } from 'src/app/clases/Familia';
import { Mensaje } from 'src/app/clases/Mensaje';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accion, EstadoFamiliar, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
import { UtilService } from 'src/app/servicio/util.service';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-familia/ResponseDatosIniciales';
import { TipoDato } from 'src/app/clases/TipoDato';
import { ResponseGlobal } from 'src/app/clases/response/ResponseGlobal';

@Component({
  selector: 'app-registro-familia',
  templateUrl: './registro-familia.component.html',
  styleUrls: ['./registro-familia.component.css']
})
export class RegistroFamiliaComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  familia: Familia = new Familia();

  familiaForm: FormGroup = this.fb.group({
    vEstadoFamiliar: ['', []],
    vNumeroMatrimonio: ['', []],
    vNumeroEsposo: ['', []],
    vEstructuraFamiliar: ['', []],
    vEscolaridad: ['', []],
    vReligion: ['', [
      Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð \',.-]{2,48}[a-z]{2}')
    ]],
    vHijosVarones: ['', [
      Validators.pattern('^[0-9]+'),
      Validators.min(0),
      Validators.max(150)
    ]],
    vHijasMujeres: ['', [
      Validators.pattern('^[0-9]+'),
      Validators.min(0),
      Validators.max(150)
    ]],
    vNombresApellidosApoyo: ['', [
      Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð \',.-]{2,48}[a-z]{2}')
    ]],
    vCelularApoyo: ['', [
      Validators.pattern('^[0-9]+'),
      Validators.minLength(8),
      Validators.maxLength(8)
    ]],
  });
  modoLectura: boolean = true;
  estadosFamiliares: TipoDato[];
  numerosMatrimonios: TipoDato[];
  habilitarMatrimonio: boolean;
  numerosEsposos: TipoDato[];
  habilitarEsposo: boolean;
  estructurasFamiliares: TipoDato[];
  escolaridades: TipoDato[];

  get f() { return this.familiaForm.controls; }

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
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-familia/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }

      this.familia = resDatosIniciales.familia;
      this.estadosFamiliares = resDatosIniciales.estadosFamiliares;
      this.numerosMatrimonios = resDatosIniciales.numerosMatrimonios;
      this.numerosEsposos = resDatosIniciales.numerosEsposos;
      this.estructurasFamiliares = resDatosIniciales.estructurasFamiliares;
      this.escolaridades = resDatosIniciales.escolaridades;

      this.cargando = false;
    });
  }

  cambiarEstadoFamiliar(e: any) {
    //console.log(e.target.value);
    this.habilitarMatrimonio = e.target.value == EstadoFamiliar.CASADO;
    if (!this.habilitarMatrimonio) {
      this.familia.numero_matrimonio = undefined;
    }

    this.habilitarEsposo = e.target.value == EstadoFamiliar.UNION_LIBRE;
    if (!this.habilitarEsposo) {
      this.familia.numero_esposo = undefined;
    }
  }

  async guardar() {
    console.log('familia', this.familia);
    this.mensaje = null;
    if (this.util.validar(this.familiaForm)) {
      this.cargando = true;
      let resRegistroFamilia: ResponseGlobal;
      let reqRegistrarFamilia: { familia: Familia } = { familia: this.familia }
      try {
        resRegistroFamilia = await this.fmk.postGlobal<ResponseGlobal>('/registro-familia/registrar', reqRegistrarFamilia).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroFamilia.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroFamilia.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', this.familia.parcero_id]);
      } else {
        this.mensaje = new Mensaje(resRegistroFamilia.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }
}
