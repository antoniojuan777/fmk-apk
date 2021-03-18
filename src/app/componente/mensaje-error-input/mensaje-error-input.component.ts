import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mensaje-error-input',
  templateUrl: './mensaje-error-input.component.html',
  styleUrls: ['./mensaje-error-input.component.css']
})
export class MensajeErrorInputComponent implements OnInit {

  @Input("control")
  control: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
