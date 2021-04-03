import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMensaje } from 'src/app/clases/Constantes';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Parcero } from 'src/app/clases/Parcero';
import { ResponseDatosIniciales } from 'src/app/clases/response/registro-parcero/ResponseDatosIniciales';
import { TipoDato } from 'src/app/clases/TipoDato';
import { FmkService } from 'src/app/servicio/fmk.service';
import { UtilService } from 'src/app/servicio/util.service';

@Component({
  selector: 'app-registro-parcero',
  templateUrl: './registro-parcero.component.html',
  styleUrls: ['./registro-parcero.component.css']
})
export class RegistroParceroComponent implements OnInit {

  cargando: boolean = false;

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
    vNombre: ['', [
      Validators.pattern('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð \',.-]{2,48}[a-z]{2}')
    ]],
    vApellido: ['', [
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
    vComentarios: ['', []],
  });
  mensaje: Mensaje;

  get f() { return this.parceroForm.controls; }

  constructor(
    private fb: FormBuilder,
    private fmk: FmkService,
    private util: UtilService
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

  guardar(){
    console.log('Parcero',this.parcero);
    if (this.util.validar(this.parceroForm)) {
    }
  }
}
