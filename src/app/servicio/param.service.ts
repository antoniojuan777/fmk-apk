import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  datos = new Map();
  constructor() { }

  set(llave: string, valor: any) {
    this.datos.set(llave, valor);
  }

  get(llave: string) {
    let valor = this.datos.get(llave);
    this.datos.delete(llave);
    return valor;
  }

  has(llave: string): boolean {
    return this.datos.has(llave);
  }
}
