import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SesionService } from './sesion.service';
import { Aplicacion } from '../clases/Constantes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FmkService {
  constructor(
    public http: HttpClient,
    private sesion: SesionService,
    private router: Router
  ) { }

  getGlobal<Object>(url: string) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    if (this.sesion.isSesionIniciada()) {
      headers = headers.set('Authorization', 'Bearer ' + this.sesion.get('token'));
    }

    return this.http.get<Object>(Aplicacion.DOMINIO_FMK + '/api' + url, {
      headers: headers
    });
  }
  postGlobal<Object>(url: string, objeto: any) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    if (this.sesion.isSesionIniciada()) {
      headers = headers.set('Authorization', 'Bearer ' + this.sesion.get('token'));
    }

    return this.http.post<Object>(Aplicacion.DOMINIO_FMK + '/api' + url, objeto, {
      headers: headers
    });
  }
  deleteGlobal<Object>(url: string, codigo: string) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    if (this.sesion.isSesionIniciada()) {
      headers = headers.set('Authorization', 'Bearer ' + this.sesion.get('token'));
    }

    return this.http.delete<Object>(Aplicacion.DOMINIO_FMK + '/api' + url + codigo, {
      headers: headers,
    });
  }

  putGlobal<Object>(url: string, id: string, objeto: any) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    if (this.sesion.isSesionIniciada()) {
      headers = headers.set('Authorization', 'Bearer ' + this.sesion.get('token'));
    }

    return this.http.put<Object>(Aplicacion.DOMINIO_FMK + '/api' + url + id, objeto, {
      headers: headers,
    });
  }

  verificarSesion(error:any) {
    console.log(error);
    if (error.status == 401) {
      this.sesion.cerrarSesion();
      this.router.navigate(['/login']);
    }
  }
}
