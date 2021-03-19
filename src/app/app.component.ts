import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from './servicio/sesion.service';

//funcion en main.js
declare function iniciarComponentes():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'munasim-k';

  constructor(
    private sesion: SesionService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    
  }

  isSesionIniciada():boolean{
    return this.sesion.isSesionIniciada();
  }

  cerrarSesion():void{
    this.sesion.cerrarSesion();
  }

  ngAfterViewInit():void{
    iniciarComponentes();
  }
}
