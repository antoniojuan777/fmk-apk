import { Parcero } from "../Parcero";
import { ResponseGlobal } from "./ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal{
    constructor(
        public ok:boolean,
        public mensaje:string,
        public parceros:Parcero[]
    ){
        super(ok, mensaje);
    }
}