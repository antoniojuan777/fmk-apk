import { Peticion } from "src/app/clases/Peticion";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal{
    constructor(
        public ok: boolean,
        public mensaje: string,
        public peticion: Peticion
    ) {
        super(ok, mensaje);
    }
}