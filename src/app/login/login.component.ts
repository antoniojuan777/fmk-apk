import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string = "";
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

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  ingresar():void{
    if(this.loginForm.valid){
      if(this.correo == 'antoniojuan777@gmail.com' && this.password=='123'){
        alert('si');
      }
    }
  }
}
