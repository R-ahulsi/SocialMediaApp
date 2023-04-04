export class User {

    constructor (
        public user_id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public dob: string,
        public gender: string,
        public hometown: string,
    ){}
    
}