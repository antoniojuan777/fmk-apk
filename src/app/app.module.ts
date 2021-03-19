import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MensajeErrorInputComponent } from './componente/mensaje-error-input/mensaje-error-input.component';
import { MensajeComponent } from './componente/mensaje/mensaje.component';
import { RegistroParceroComponent } from './educador-ce/registro-parcero/registro-parcero.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    MensajeErrorInputComponent,
    MensajeComponent,
    RegistroParceroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: InicioComponent },
      { path: 'login', component: LoginComponent },
      { path: 'educador-ce/registro-parcero', component: RegistroParceroComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
