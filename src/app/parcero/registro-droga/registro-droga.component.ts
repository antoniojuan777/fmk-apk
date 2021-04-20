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
import { Droga } from 'src/app/clases/Droga';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/registro-droga/ResponseDatosIniciales';

@Component({
  selector: 'app-registro-droga',
  templateUrl: './registro-droga.component.html',
  styleUrls: ['./registro-droga.component.css']
})
export class RegistroDrogaComponent implements OnInit {

  cargando: boolean = false;
  mensaje: Mensaje;

  droga: Droga = new Droga();

  drogaForm: FormGroup = this.fb.group({
    
  });
  modoLectura: boolean = true;
  
  get f() { return this.drogaForm.controls; }

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
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/registro-droga/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }

      this.droga = resDatosIniciales.droga;

      this.cargando = false;
    });
  }

  async guardar() {
    console.log('droga', this.droga);
    this.mensaje = null;
    if (this.util.validar(this.drogaForm)) {
      this.cargando = true;
      let resRegistroDroga: ResponseGlobal;
      let reqRegistrarDroga: { droga: Droga } = { droga: this.droga }
      try {
        resRegistroDroga = await this.fmk.postGlobal<ResponseGlobal>('/registro-droga/registrar', reqRegistrarDroga).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resRegistroDroga.ok) {
        this.param.set('mensaje', new Mensaje(resRegistroDroga.mensaje, TipoMensaje.EXITO));
        this.router.navigate(['/parcero/detalle-parcero', this.droga.parcero_id]);
      } else {
        this.mensaje = new Mensaje(resRegistroDroga.mensaje, TipoMensaje.ALERTA);
      }
      this.cargando = false;
    }
  }
}
