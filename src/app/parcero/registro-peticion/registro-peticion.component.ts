import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/Mensaje';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
import { UtilService } from 'src/app/servicio/util.service';
import { ResponseGlobal } from 'src/app/clases/response/ResponseGlobal';
import { Peticion } from 'src/app/clases/Peticion';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-peticion/ResponseDatosIniciales';

@Component({
  selector: 'app-registro-peticion',
  templateUrl: './registro-peticion.component.html',
  styleUrls: ['./registro-peticion.component.css']
})
export class RegistroPeticionComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  peticion: Peticion = new Peticion();

  peticionForm: FormGroup = this.fb.group({
    
  });
  modoLectura: boolean = true;
  
  get f() { return this.peticionForm.controls; }

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
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-peticion/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }

      this.peticion = resDatosIniciales.peticion;

      this.cargando = false;
    });
  }

  async guardar() {
    console.log('peticion', this.peticion);
    this.mensaje = null;
    if (this.util.validar(this.peticionForm)) {
      this.cargando = true;
      let resRegistroPeticion: ResponseGlobal;
      let reqRegistrarPeticion: { peticion: Peticion } = { peticion: this.peticion }
      try {
        resRegistroPeticion = await this.fmk.postGlobal<ResponseGlobal>('/registro-peticion/registrar', reqRegistrarPeticion).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroPeticion.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroPeticion.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', this.peticion.parcero_id]);
      } else {
        this.mensaje = new Mensaje(resRegistroPeticion.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }

}
