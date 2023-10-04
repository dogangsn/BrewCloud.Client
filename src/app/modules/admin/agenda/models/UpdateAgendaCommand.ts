export class UpdateAgendaCommand {
    id: string;
    suppliername: string;
    email: string;
    phone: string;
    active: boolean;

    constructor(id:string,suppliername: string,email: string,phone: string, active: boolean) {
        this.id = id;
        this.suppliername = suppliername;
        this.email = email;
        this.phone = phone;
        this.active = active;
    }
}
