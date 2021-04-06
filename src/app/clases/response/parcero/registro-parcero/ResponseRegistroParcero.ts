import { Parcero } from "../../../Parcero";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseRegistroParcero extends ResponseGlobal{

    constructor(
        public ok:boolean,
        public mensaje:string,
        public parcero:Parcero
    ){
        super(ok, mensaje);
    }
}