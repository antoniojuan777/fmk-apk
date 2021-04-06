import { Injectable } from '@angular/core';
import { Accion, IdRol } from '../clases/Constantes';
import { Rol } from '../clases/Rol';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  constructor() { }

  isSesionIniciada(): boolean {
    return localStorage.getItem('sesionIniciada') == 'true';
  }

  iniciarSesion(token: string, correo: string, nombre: string, rol: Rol) {
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

  get(llave: string): any {
    return localStorage.getItem(llave);
  }

  tieneAcceso(accion: number, idRol: number): boolean {
    let rol = Rol.fromStringJSON(this.get('rol'));
    let vTieneAcceso: boolean
    switch (accion) {
      case Accion.REGISTRA:
        vTieneAcceso = rol.registra;
        break;
      case Accion.RECUPERA:
        vTieneAcceso = rol.recupera;
        break;
      case Accion.IMPRIME:
        vTieneAcceso = rol.imprime;
        break;
      case Accion.ELIMINA:
        vTieneAcceso = rol.elimina;
        break;
      default:
        break;
    }
    return (rol.id == IdRol.SUPERADMINISTRADOR || rol.id == idRol) && vTieneAcceso;
  }

}
