import { Droga } from "src/app/clases/Droga";
import { ResponseGlobal } from "../../ResponseGlobal";

export class ResponseDatosIniciales extends ResponseGlobal{
    constructor(
        public ok:boolean,
        public mensaje:string,
        public droga:Droga
    ){
        super(ok, mensaje);
    }
}