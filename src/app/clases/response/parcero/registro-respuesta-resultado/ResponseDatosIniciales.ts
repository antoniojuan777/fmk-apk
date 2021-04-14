import { Respuesta } from "src/app/clases/Respuesta";
import { TipoDato } from "src/app/clases/TipoDato";
import { ResponseGlobal } from "../../ResponseGlobal";
import { Resultado } from "../../Resultado";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public respuesta: Respuesta,
        public resultado: Resultado,
        public resultados: TipoDato[]
    ) {
        super(ok, mensaje);
    }
}