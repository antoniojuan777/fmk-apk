import { Parcero } from "../../../Parcero";
import { TipoDato } from "../../../TipoDato";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal{
    constructor(
        public ok:boolean,
        public mensaje:string,
        public servicios:TipoDato[],
        public formasContactos:TipoDato[],
        public paises:TipoDato[],
        public parcero:Parcero
    ){
        super(ok, mensaje);
    }
}