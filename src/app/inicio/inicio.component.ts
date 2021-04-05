import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMensaje } from '../clases/Constantes';
import { Mensaje } from '../clases/Mensaje';
import { Parcero } from '../clases/Parcero';
import { ResponseDatosIniciales } from '../clases/response/ResponseDatosIniciales';
import { Rol } from '../clases/Rol';
import { FmkService } from '../servicio/fmk.service';
import { ParamService } from '../servicio/param.service';
import { SesionService } from '../servicio/sesion.service';
import { UtilService } from '../servicio/util.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cargando: boolean;
  rol: Rol;
  mensaje: Mensaje;
  parceros: Parcero[];

  constructor(
    private sesion: SesionService,
    private router: Router,
    private fmk: FmkService,
    private util: UtilService,
    private param: ParamService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.sesion.isSesionIniciada()) {
      this.router.navigate(['/login']);
    } else {
      this.rol = Rol.fromStringJSON(this.sesion.get('rol'));
      this.cargando = true;
      let resDatosIniciales: ResponseDatosIniciales;
      try {
        resDatosIniciales = await this.fmk.getGlobal<ResponseDatosIniciales>('/datos-iniciales').toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (this.rol.isEducadorCE()) {
        this.parceros = resDatosIniciales.parceros;
      }
      this.cargando = false;
    }
  }

  irDetalleParcero(parcero: Parcero) {
    this.param.set('parcero', parcero);
    this.router.navigate(['/parcero/detalle-parcero']);
  }

}
