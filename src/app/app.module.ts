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
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './componente/loading/loading.component';
import { DetalleParceroComponent } from './parcero/detalle-parcero/detalle-parcero.component';
import { ImagenParceroComponent } from './componente/imagen-parcero/imagen-parcero.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    MensajeErrorInputComponent,
    MensajeComponent,
    RegistroParceroComponent,
    LoadingComponent,
    DetalleParceroComponent,
    ImagenParceroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: InicioComponent },
      { path: 'login', component: LoginComponent },
      { path: 'educador-ce/registro-parcero', component: RegistroParceroComponent },
      { path: 'parcero/detalle-parcero', component: DetalleParceroComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
