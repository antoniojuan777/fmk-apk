import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Parcero } from 'src/app/clases/Parcero';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/detalle-parcero/ResponseDatosIniciales';
import { User } from 'src/app/clases/User';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
import { UtilService } from 'src/app/servicio/util.service';

@Component({
  selector: 'app-detalle-parcero',
  templateUrl: './detalle-parcero.component.html',
  styleUrls: ['./detalle-parcero.component.css']
})
export class DetalleParceroComponent implements OnInit {
  cargando: boolean = false;
  mensaje: Mensaje;

  parcero: Parcero;
  educador: User;

  constructor(
    private param: ParamService,
    private fmk: FmkService,
    private util: UtilService,
    private route: ActivatedRoute,
    private sesion: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.mensaje = null;
    this.route.params.subscribe(async params => {
      let parcero_id = params['parcero_id'];
      if (this.param.has('mensaje')) {
        this.mensaje = this.param.get('mensaje');
      }
      let resDatosIniciales: ResponseDatosIniciales;
      let reqDatosIniciales: { parcero_id: number } = { parcero_id: parcero_id }
      try {
        resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/detalle-parcero/datos-iniciales', reqDatosIniciales).toPromise();
      } catch (error) {
        this.fmk.verificarSesion(error);
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      this.educador = resDatosIniciales.educador;
      this.parcero = resDatosIniciales.parcero;
      this.cargando = false;
    });

  }

  tieneAccesoRegistrarEducadorCE(): boolean {
    return this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
  }

  irParcero() {
    this.router.navigate(['/parcero/registro-parcero', this.parcero.id]);
  }
}
