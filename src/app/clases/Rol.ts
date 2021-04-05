import { IdRol } from "./Constantes";

export class Rol {
    constructor(
        public id: number,
        public tipo_rol: string,
        public registra: boolean,
        public recupera: boolean,
        public imprime: boolean,
        public elimina: boolean,
    ) {

    }

    isEducadorCE() {
        return this.id == IdRol.SUPERADMINISTRADOR || this.id == IdRol.EDUCADOR_CE;
    }

    static fromStringJSON(jsonString: string): Rol {
        let rolJson = JSON.parse(jsonString);
        let rol: Rol = new Rol(rolJson.id,
            rolJson.tipo_rol,
            rolJson.registra,
            rolJson.recupera,
            rolJson.imprime,
            rolJson.elimina);
        return rol;
    }

}