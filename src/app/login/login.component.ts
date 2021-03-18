import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoMensaje } from '../clases/Constantes';
import { Mensaje } from '../clases/Mensaje';
import { SesionService } from '../servicio/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string = "juanpyven@gmail.com";
  password: string = "";

  loginForm: FormGroup = this.fb.group({
    vCorreo: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.email]],
    vPassword: ['', [
      Validators.required
    ],]
  });
  mensaje: Mensaje;

  constructor(
    public fb: FormBuilder,
    public sesion: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  ingresar():void{
    if(this.loginForm.valid){
      if(this.correo == 'juanpyven@gmail.com' && this.password=='123'){
        this.sesion.iniciarSesion();
        this.router.navigate(['/']);
      } else {
        this.mensaje=new Mensaje('Correo y/o contraseña incorrectos.',TipoMensaje.ERROR);
      }
    }
  }
}
