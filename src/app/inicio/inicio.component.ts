import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../servicio/sesion.service';
declare function iniciarSesion():any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private sesion: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.sesion.isSesionIniciada()){
      this.router.navigate(['/login']);
    } else {
      iniciarSesion();
    }
  }

}
