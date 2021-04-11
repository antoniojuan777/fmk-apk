import { Empleo } from "src/app/clases/Empleo";
import { TipoDato } from "src/app/clases/TipoDato";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public empleo: Empleo,
        public empleos: TipoDato[]
    ) {
        super(ok, mensaje);
    }
}