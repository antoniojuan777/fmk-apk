export class Respuesta {
    constructor(
        public id?: number,
        public cita?: boolean,
        public informacion?: boolean,
        public consejo_orientacion?: boolean,
        public canalizacion_derivacion?: boolean,
        public escucha_inmediata?: boolean,
        public indicaciones?: boolean,
        public acompaniamiento?: boolean,
        public cuidados_medicos?: boolean,
        public higiene?: boolean,
        public acogida?: boolean,
        public otro?: boolean,
        public parcero_id?: number
    ) { }
}