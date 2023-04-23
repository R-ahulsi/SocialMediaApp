export class Friend {
    formation_date:string;
    friended_user:string;
    friending_user:string;

    constructor (formation_date:string,
        friended_user:string,
        friending_user:string) {
            this.formation_date =formation_date;
            this.friended_user=friended_user;
            this.friending_user=friending_user;
        }
}

export interface Friendship {
    friended_user:string,
    friending_user:string
}