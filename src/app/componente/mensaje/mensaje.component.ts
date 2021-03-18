import { Component, Input, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/Mensaje';

@Component({
  selector: 'mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  @Input("mensaje")
  mensaje: Mensaje;
  
  constructor() { }

  ngOnInit(): void {
  }

}
