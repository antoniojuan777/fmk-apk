import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  constructor() { }

  isSesionIniciada(): boolean {
    return localStorage.getItem('sesionIniciada') == 'true';
  }

  iniciarSesion(token: string, correo:string, nombre:string) {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('token', token);
    localStorage.setItem('correo', correo);
    localStorage.setItem('nombre', nombre);
  }

  cerrarSesion() {
    localStorage.removeItem('sesionIniciada');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    localStorage.removeItem('nombre');
  }

  get(llave: string):any {
    return localStorage.getItem(llave);
  }
}
