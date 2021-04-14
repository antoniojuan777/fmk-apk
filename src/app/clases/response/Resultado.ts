export class Resultado {
    constructor(
        public id?: number,
        public resultado?: string,
        public otro?: boolean,
        public descripcion_otro?: string,
        public parcero_id?: number
    ) { }
}