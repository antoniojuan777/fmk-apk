import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TipoMensaje } from '../clases/Constantes';
import { Mensaje } from '../clases/Mensaje';
import { RequestLogin } from '../clases/request/RequestLogin';
import { ResponseLogin } from '../clases/response/ResponseLogin';
import { FmkService } from '../servicio/fmk.service';
import { SesionService } from '../servicio/sesion.service';
import { UtilService } from '../servicio/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cargando: boolean = false;
  correo: string = "antoniojuan777@gmail.com";
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
    private fb: FormBuilder,
    private sesion: SesionService,
    private router: Router,
    private util: UtilService,
    private fmk: FmkService,
    private device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  async ingresar(): Promise<void> {
    this.cargando = true;
    this.mensaje = null;
    if (this.util.validar(this.loginForm)) {
      let resLogin: ResponseLogin;
      let reqLogin: RequestLogin = new RequestLogin(this.correo, this.password, this.device.browser + ' ' + this.device.browser_version);
      try {
        resLogin = await this.fmk.postGlobal<ResponseLogin>('/login', reqLogin).toPromise();
      } catch (error) {
        this.mensaje = new Mensaje(this.util.getMensajeError(error), TipoMensaje.ERROR);
        this.cargando = false;
        return;
      }
      if (resLogin.ok) {
        this.sesion.iniciarSesion(resLogin.token, resLogin.user.email, resLogin.user.name, resLogin.rol);
        this.router.navigate(['/']);
      } else {
        this.mensaje = new Mensaje(resLogin.mensaje, TipoMensaje.ALERTA);
      }
    }
    this.cargando = false;
  }
}
