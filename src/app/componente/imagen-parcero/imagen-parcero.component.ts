import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Genero } from 'src/app/clases/Constantes';
import { Parcero } from 'src/app/clases/Parcero';

@Component({
  selector: 'imagen-parcero',
  templateUrl: './imagen-parcero.component.html',
  styleUrls: ['./imagen-parcero.component.css']
})
export class ImagenParceroComponent implements OnInit {

  @Input("parcero")
  parcero: Parcero;

  @Input("tipo")
  tipo: string;

  constructor() { }

  ngOnInit(): void {
  }

  altImage(): string {
    return (this.parcero.nombres ? this.parcero.nombres : '') + ' ' + (this.parcero.apellidos ? this.parcero.apellidos : '') + (this.parcero.apodo ? '"' + this.parcero.apodo + '"' : '');
  }

  isHombre(): boolean {
    return this.parcero.genero == Genero.HOMBRE;
  }

  isMujer(): boolean {
    return this.parcero.genero == Genero.MUJER;
  }

  clase(): string {
    if (this.tipo == 'big') {
      return 'align-self-center rounded-circle mr-3 imagen-grande';
    } else if (this.tipo == 'small') {
      return 'align-self-center rounded-circle mr-3 imagen-pequenia';
    } else {
      return null;
    }
  }
}
