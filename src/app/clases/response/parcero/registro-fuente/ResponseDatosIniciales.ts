import { Fuente } from "src/app/clases/Fuente";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public fuente: Fuente
    ) {
        super(ok, mensaje);
    }
}