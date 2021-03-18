import { Component } from '@angular/core';
import { SesionService } from './servicio/sesion.service';

declare function iniciar():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'munasim-k';

  constructor(
    private sesion: SesionService
  ) { }
  
  ngOnInit(): void {
    iniciar();
  }

  isSesionIniciada():boolean{
    return this.sesion.isSesionIniciada();
  }
}
