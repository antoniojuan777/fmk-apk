import { User } from "../../User";
import { ResponseGlobal } from "../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal{
    constructor(
        public ok:boolean,
        public mensaje:string,
        public educador:User
    ){
        super(ok, mensaje);
    }
}