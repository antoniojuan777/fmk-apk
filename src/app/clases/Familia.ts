export class Familia{
    constructor(
        public id?:number,
        public estado_familiar?:string,
        public numero_matrimonio?:string,
        public numero_esposo?:string,
        public estructura_familiar?:string,
        public escolaridad?:string,
        public hijos_varones?:number,
        public hijas_mujeres?:number,
        public religion?:string,
        public nombres_apellidos_apoyo?:string,
        public celular_apoyo?:string,
        public sabe_escribir?:boolean,
        public sabe_leer?:boolean,
        public sabe_sumar?:boolean,
        public sabe_restar?:boolean,
        public sabe_multiplicar?:boolean,
        public sabe_dividir?:boolean,
        public sabe_calcular_promedios?:boolean,
        public sabe_calcular_porcentajes?:boolean,
        public usa_computadora?:boolean,
        public parcero_id?:number
    ){

    }
}