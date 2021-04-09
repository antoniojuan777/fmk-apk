import { Component, OnInit } from '@angular/core';
import { Familia } from 'src/app/clases/Familia';
import { Mensaje } from 'src/app/clases/Mensaje';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accion, IdRol, TipoMensaje } from 'src/app/clases/Constantes';
import { FmkService } from 'src/app/servicio/fmk.service';
import { ParamService } from 'src/app/servicio/param.service';
import { SesionService } from 'src/app/servicio/sesion.service';
import { UtilService } from 'src/app/servicio/util.service';

@Component({
  selector: 'app-registro-familia',
  templateUrl: './registro-familia.component.html',
  styleUrls: ['./registro-familia.component.css']
})
export class RegistroFamiliaComponent implements OnInit {
  
  cargando: boolean = false;
  mensaje: Mensaje;

  familia: Familia = new Familia();

  familiaForm: FormGroup = this.fb.group({
    
  });
  modoLectura: boolean = true;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private sesion: SesionService,
    private fmk: FmkService,
    private route: ActivatedRoute,
    private param: ParamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.mensaje = null;
    this.route.params.subscribe(async params => {
      this.modoLectura = !this.sesion.tieneAcceso(Accion.REGISTRA, IdRol.EDUCADOR_CE);
      let parcero_id = params['parcero_id'];
      this.cargando = false;
    });
  }
  async guardar() {
    console.log('familia', this.familia);
  }
}
