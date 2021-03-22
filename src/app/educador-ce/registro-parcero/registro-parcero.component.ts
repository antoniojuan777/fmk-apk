import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parcero } from 'src/app/clases/Parcero';

@Component({
  selector: 'app-registro-parcero',
  templateUrl: './registro-parcero.component.html',
  styleUrls: ['./registro-parcero.component.css']
})
export class RegistroParceroComponent implements OnInit {

  parcero:Parcero=new Parcero();

  parceroForm: FormGroup = this.fb.group({
    vFechaContacto: ['', [
      Validators.required]]
  });

  get f() { return this.parceroForm.controls; }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
