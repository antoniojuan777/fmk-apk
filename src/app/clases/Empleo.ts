export class Empleo{
    constructor(
        public id?:number,
        public nunca_empleado?:boolean,
        public sin_empleo?:boolean,
        public empleo?:string,
        public otro?:boolean,
        public descripcion_otro?:string,
        public parcero_id?:number
    ){}
}