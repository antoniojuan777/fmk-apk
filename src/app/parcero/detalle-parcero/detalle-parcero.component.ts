import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Condicion } from 'src/app/clases/Condicion';
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { Empleo } from 'src/app/clases/Empleo';
import { Familia } from 'src/app/clases/Familia';
import { Fuente } from 'src/app/clases/Fuente';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Parcero } from 'src/app/clases/Parcero';
import { Peticion } from 'src/app/clases/Peticion';
import { ResponseDatosIniciales } from 'src/app/clases/response/parcero/detalle-parcero/ResponseDatosIniciales';
import { Respuesta } from 'src/app/clases/Respuesta';
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
  fuente: Fuente;
  familia: Familia;
  empleo: Empleo;
  condicion: Condicion;
  peticion: Peticion;
  respuesta: Respuesta;

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
      this.fuente = resDatosIniciales.fuente;
      this.familia = resDatosIniciales.familia;
      this.empleo = resDatosIniciales.empleo;
      this.condicion = resDatosIniciales.condicion;
      this.peticion = resDatosIniciales.peticion;
      this.respuesta = resDatosIniciales.respuesta;
      this.cargando = false;
    });

  }

  tieneAccesoRegistrarEducadorCE(): boolean {
    return this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
  }

  irParcero() {
    this.router.navigate(['/parcero/registro-parcero', this.parcero.id]);
  }

  irFuente() {
    this.router.navigate(['/parcero/registro-fuente', this.parcero.id]);
  }

  irFamilia() {
    this.router.navigate(['/parcero/registro-familia', this.parcero.id]);
  }

  irEmpleo() {
    this.router.navigate(['/parcero/registro-empleo', this.parcero.id]);
  }

  irCondiciones() {
    this.router.navigate(['/parcero/registro-condicion', this.parcero.id]);
  }

  irPeticiones() {
    this.router.navigate(['/parcero/registro-peticion', this.parcero.id]);
  }

  irRespuestaResultado() {
    this.router.navigate(['/parcero/registro-respuesta-resultado', this.parcero.id]);
  }

  botonVer() {
    return !this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
  }

  botonRegistrar() {
    return this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
  }

  botonEditar() {
    return this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
  }
}
