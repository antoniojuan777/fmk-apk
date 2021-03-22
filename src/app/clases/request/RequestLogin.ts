export class RequestLogin{
    constructor(
        public email: string,
        public password: string,
        public device: string
    ) { }
}