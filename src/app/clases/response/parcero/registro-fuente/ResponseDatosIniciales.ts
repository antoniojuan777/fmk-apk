import { Fuente } from "src/app/clases/Fuente";
import { TipoDato } from "src/app/clases/TipoDato";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public fuente: Fuente,
        public mediosConocimientosOrgs: TipoDato[],
        public relacionesPacientes: TipoDato[]
    ) {
        super(ok, mensaje);
    }
}