import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  validar(form: FormGroup): boolean {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsDirty();
    });
    return form.valid;
  }

  getMensajeError(error: any): string {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error) {
        errorMessage += "; " + error.error.message;
      }
    }
    return errorMessage;
  }

}
