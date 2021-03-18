import { Component } from '@angular/core';
import { SesionService } from './servicio/sesion.service';

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
    
  }

  isSesionIniciada():boolean{
    return this.sesion.isSesionIniciada();
  }

  cerrarSesion():void{
    this.sesion.cerrarSesion();
  }
}
