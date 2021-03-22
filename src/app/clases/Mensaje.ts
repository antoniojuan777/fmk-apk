import { TipoMensaje } from "./Constantes";

export class Mensaje {
    
    constructor(
        public mensaje: string,
        public tipo: number
    ) {

    }

    claseMensaje(): string {
        switch (this.tipo) {
            case TipoMensaje.ERROR:
                return 'alert-danger';
            case TipoMensaje.INFO:
                return 'alert-primary';
            case TipoMensaje.ALERTA:
                return 'alert-warning';
            case TipoMensaje.EXITO:
                return 'alert-success';
            default:
                return '';
        }
    }
}