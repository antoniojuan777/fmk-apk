export class Parcero{
    constructor(
        public id?:number,
        public fecha_contacto?:Date,
        public hora_contacto?:string,
        public institucion?:string,
        public servicio?:string,
        public forma_contacto?:string,
        public nombres?:string,
        public apellidos?:string,
        public apodo?:string,
        public edad?:number,
        public genero?:string,
        public celular?:string,
        public pais?:string,
        public ciudad?:string,
        public calle?:string,
        public comentario?:string,
        public created_at?:Date,
        public updated_at?:Date
    ){

    }
    
}