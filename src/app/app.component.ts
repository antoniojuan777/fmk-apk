import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseGlobal } from './clases/response/ResponseGlobal';
import { FmkService } from './servicio/fmk.service';
import { SesionService } from './servicio/sesion.service';

//funcion en main.js
declare function iniciarComponentes(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'munasim-k';
  cargando: boolean = false;

  constructor(
    private sesion: SesionService,
    private fmk: FmkService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  isSesionIniciada(): boolean {
    return this.sesion.isSesionIniciada();
  }

  nombreUsuario():string{
    return this.sesion.get('nombre');
  }
  correoUsuario():string{
    return this.sesion.get('correo');
  }

  async cerrarSesion(): Promise<void> {
    this.cargando = true;
    let resLogout: ResponseGlobal;
    try {
      resLogout = await this.fmk.postGlobal<ResponseGlobal>('/logout', null).toPromise();
    } catch (error) {
      this.fmk.verificarSesion(error);
      this.cargando = false;
      return;
    }
    if (resLogout.ok) {
      this.router.navigate(['/login']);
      this.sesion.cerrarSesion();
    } else {
      alert(resLogout.mensaje);
    }
    this.cargando = false;
  }

  ngAfterViewInit(): void {
    iniciarComponentes();
  }
}
