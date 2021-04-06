import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accion, IdRol, TipoMensaje } from '../clases/Constantes';
import { Mensaje } from '../clases/Mensaje';
import { Parcero } from '../clases/Parcero';
import { ResponseDatosIniciales } from '../clases/response/ResponseDatosIniciales';
import { FmkService } from '../servicio/fmk.service';
import { SesionService } from '../servicio/sesion.service';
import { UtilService } from '../servicio/util.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cargando: boolean;
  mensaje: Mensaje;
  parceros: Parcero[];

  constructor(
    private sesion: SesionService,
    private router: Router,
    private fmk: FmkService,
    private util: UtilService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.sesion.isSesionIniciada()) {
      this.router.navigate(['/login']);
    } else {
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
      this.parceros = resDatosIniciales.parceros;
      this.cargando = false;
    }
  }

  irDetalleParcero(parcero: Parcero) {
    this.router.navigate(['/parcero/detalle-parcero', parcero.id]);
  }

  tieneAccesoRegistrarEducadorCE():boolean{
    return this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
  }
}
