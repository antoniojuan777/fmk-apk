import { Injectable } from '@angular/core';
import { Rol } from '../clases/Rol';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  constructor() { }

  isSesionIniciada(): boolean {
    return localStorage.getItem('sesionIniciada') == 'true';
  }

  iniciarSesion(token: string, correo:string, nombre:string, rol:Rol) {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('token', token);
    localStorage.setItem('correo', correo);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('rol', JSON.stringify(rol));
  }

  cerrarSesion() {
    localStorage.removeItem('sesionIniciada');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
  }

  get(llave: string):any {
    return localStorage.getItem(llave);
  }
}
