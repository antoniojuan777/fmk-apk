import { Familia } from "src/app/clases/Familia";
import { TipoDato } from "src/app/clases/TipoDato";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public familia: Familia,
        public estadosFamiliares: TipoDato[],
        public numerosMatrimonios: TipoDato[],
        public numerosEsposos: TipoDato[],
        public estructurasFamiliares: TipoDato[],
        public escolaridades: TipoDato[]
    ) {
        super(ok, mensaje);
    }
}