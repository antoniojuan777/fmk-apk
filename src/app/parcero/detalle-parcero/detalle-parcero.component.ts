import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Parcero } from 'src/app/clases/Parcero';
import { ParamService } from 'src/app/servicio/param.service';

@Component({
  selector: 'app-detalle-parcero',
  templateUrl: './detalle-parcero.component.html',
  styleUrls: ['./detalle-parcero.component.css']
})
export class DetalleParceroComponent implements OnInit {
  cargando: boolean = false;
  mensaje: Mensaje;

  parcero: Parcero;

  constructor(
    private param: ParamService
  ) { }

  ngOnInit(): void {
    if (this.param.has('parcero')) {
      this.parcero = this.param.get('parcero');
    }
    if (this.param.has('mensaje')) {
      this.mensaje = this.param.get('mensaje');
    }
  }

}
