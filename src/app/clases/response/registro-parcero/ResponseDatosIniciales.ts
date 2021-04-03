import { TipoDato } from "../../TipoDato";
import { ResponseGlobal } from "../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal{
    constructor(
        public ok:boolean,
        public mensaje:string,
        public servicios:TipoDato[],
        public formasContactos:TipoDato[],
        public paises:TipoDato[]
    ){
        super(ok, mensaje);
    }
}