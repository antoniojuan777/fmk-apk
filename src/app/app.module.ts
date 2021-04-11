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
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './componente/loading/loading.component';
import { DetalleParceroComponent } from './parcero/detalle-parcero/detalle-parcero.component';
import { ImagenParceroComponent } from './componente/imagen-parcero/imagen-parcero.component';
import { RegistroParceroComponent } from './parcero/registro-parcero/registro-parcero.component';
import { RegistroFuenteComponent } from './parcero/registro-fuente/registro-fuente.component';
import { RegistroFamiliaComponent } from './parcero/registro-familia/registro-familia.component';
import { EmpleoComponent } from './parcero/empleo/empleo.component';
import { RegistroCondicionComponent } from './parcero/registro-condicion/registro-condicion.component';

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
    ImagenParceroComponent,
    RegistroFuenteComponent,
    RegistroFamiliaComponent,
    EmpleoComponent,
    RegistroCondicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: InicioComponent },
      { path: 'login', component: LoginComponent },
      { path: 'parcero/registro-parcero', component: RegistroParceroComponent },
      { path: 'parcero/registro-parcero/:parcero_id', component: RegistroParceroComponent },
      { path: 'parcero/detalle-parcero/:parcero_id', component: DetalleParceroComponent },
      { path: 'parcero/registro-fuente/:parcero_id', component: RegistroFuenteComponent },
      { path: 'parcero/registro-familia/:parcero_id', component: RegistroFamiliaComponent },
      { path: 'parcero/registro-empleo/:parcero_id', component: EmpleoComponent },
      { path: 'parcero/registro-condicion/:parcero_id', component: RegistroCondicionComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
