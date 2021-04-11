import { Condicion } from "src/app/clases/Condicion";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public condicion: Condicion
    ) {
        super(ok, mensaje);
    }
}