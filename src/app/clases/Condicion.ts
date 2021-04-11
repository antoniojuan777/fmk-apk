export class Condicion {
    constructor(
        public sustancias_alcohol?: boolean,
        public conductas_antisociales?: boolean,
        public psiquiatricas?: boolean,
        public conductuales?: boolean,
        public relacionales?: boolean,
        public violencia_familiar?: boolean,
        public violacion?: boolean,
        public trabajo_sexual?: boolean,
        public legal?: boolean,
        public embarazo_parto?: boolean,
        public enfermedades?: boolean,
        public pobreza_extrema?: boolean,
        public vida_calle?: boolean,
        public apoyo_economico?: boolean,
        public escolares?: boolean,
        public exclusion_grave?: boolean,
        public violencia_intracom?: boolean,
        public redes_interinst?: boolean,
        public crisis_psicologica?: boolean,
        public capacitacion_formacion?: boolean,
        public oganizacion_planeacion?: boolean,
        public hiv?: boolean,
        public ets?: boolean,
        public aids?: boolean,
        public sin_trabajo?: boolean,
        public tb?: boolean,
        public problemas_familiares?: boolean,
        public tep_lt?: boolean,
        public tep_st?: boolean,
        public problemas_sexuales?: boolean,
        public violacion_ninio?: boolean,
        public otras_depedencias?: boolean,
        public drogas_intravena?: boolean,
        public otros?: boolean,
        public hepatitis?: boolean,
        public parcero_id?: number
    ) {

    }
}