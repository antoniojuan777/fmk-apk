import { User } from "../User";
import { ResponseGlobal } from "./ResponseGlobal";

export class ResponseLogin extends ResponseGlobal{
    constructor(
        public ok: boolean,
        public mensaje: string,
        public token: string,
        public user: User
    ) {
        super(ok, mensaje);
     }
}