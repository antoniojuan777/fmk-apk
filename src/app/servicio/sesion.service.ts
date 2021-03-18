import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  constructor() { }

  isSesionIniciada(): boolean {
    return localStorage.getItem('sesionIniciada')=='true';
  }

  iniciarSesion() {
    localStorage.setItem('sesionIniciada', 'true');
  }

  cerrarSesion() {
    localStorage.removeItem('sesionIniciada');
  }
}
