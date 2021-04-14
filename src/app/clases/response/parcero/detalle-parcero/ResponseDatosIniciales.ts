import { Condicion } from "src/app/clases/Condicion";
import { Empleo } from "src/app/clases/Empleo";
import { Familia } from "src/app/clases/Familia";
import { Fuente } from "src/app/clases/Fuente";
import { Peticion } from "src/app/clases/Peticion";
import { Respuesta } from "src/app/clases/Respuesta";
import { Parcero } from "../../../Parcero";
import { User } from "../../../User";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public parcero: Parcero,
        public educador: User,
        public fuente: Fuente,
        public familia: Familia,
        public empleo: Empleo,
        public condicion: Condicion,
        public peticion: Peticion,
        public respuesta: Respuesta
    ) {
        super(ok, mensaje);
    }
}