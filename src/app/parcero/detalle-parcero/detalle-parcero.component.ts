import { Component, OnInit } from '@angular/core';
import { TipoMensaje } from 'src/app/clases/Constantes';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Parcero } from 'src/app/clases/Parcero';
import { RequestDatosIniciales } from 'src/app/clases/request/detalle-parcero/RequestDatosIniciales';
import { ResponseDatosIniciales } from 'src/app/clases/response/detalle-parcero/ResponseDatosIniciales';
import { User } from 'src/app/clases/User';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
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
    private util: UtilService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargando = true;
    this.mensaje = null;
    if (this.param.has('parcero')) {
      this.parcero = this.param.get('parcero');
    }
    if (this.param.has('mensaje')) {
      this.mensaje = this.param.get('mensaje');
    }
    let resDatosIniciales: ResponseDatosIniciales;
    let reqDatosIniciales: RequestDatosIniciales=new RequestDatosIniciales(this.parcero.id);
    try {
      resDatosIniciales = await this.fmk.postGlobal<ResponseDatosIniciales>('/detalle-parcero/datos-iniciales',reqDatosIniciales).toPromise();
    } catch (error) {
      this.fmk.verificarSesion(error);
      this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
      this.cargando = false;
      return;
    }
    this.educador = resDatosIniciales.educador;
    this.cargando = false;
  }

}
