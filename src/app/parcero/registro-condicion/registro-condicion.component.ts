import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/Mensaje';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accion, EstadoFamiliar, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
import { UtilService } from 'src/app/servicio/util.service';
import { ResponseGlobal } from 'src/app/clases/response/ResponseGlobal';
import { Condicion } from 'src/app/clases/Condicion';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-condicion/ResponseDatosIniciales';

@Component({
  selector: 'app-registro-condicion',
  templateUrl: './registro-condicion.component.html',
  styleUrls: ['./registro-condicion.component.css']
})
export class RegistroCondicionComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  condicion: Condicion = new Condicion();

  condicionForm: FormGroup = this.fb.group({
    
  });
  modoLectura: boolean = true;
  
  get f() { return this.condicionForm.controls; }

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
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-condicion/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }

      this.condicion = resDatosIniciales.condicion;

      this.cargando = false;
    });
  }
  async guardar() {
    console.log('condicion', this.condicion);
    this.mensaje = null;
    if (this.util.validar(this.condicionForm)) {
      this.cargando = true;
      let resRegistroCondicion: ResponseGlobal;
      let reqRegistrarCondicion: { condicion: Condicion } = { condicion: this.condicion }
      try {
        resRegistroCondicion = await this.fmk.postGlobal<ResponseGlobal>('/registro-condicion/registrar', reqRegistrarCondicion).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroCondicion.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroCondicion.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', this.condicion.parcero_id]);
      } else {
        this.mensaje = new Mensaje(resRegistroCondicion.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }

}
