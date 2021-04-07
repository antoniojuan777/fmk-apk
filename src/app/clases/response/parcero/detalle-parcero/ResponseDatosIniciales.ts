import { Fuente } from "src/app/clases/Fuente";
import { Parcero } from "../../../Parcero";
import { User } from "../../../User";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal {
    constructor(
        public ok: boolean,
        public mensaje: string,
        public parcero: Parcero,
        public educador: User,
        public fuente: Fuente
    ) {
        super(ok, mensaje);
    }
}