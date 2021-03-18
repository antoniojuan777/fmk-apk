import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  sesionIniciada: boolean = false;

  constructor() { }

  isSesionIniciada(): boolean {
    return this.sesionIniciada;
  }

}
