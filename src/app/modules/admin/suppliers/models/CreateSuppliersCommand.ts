export class CreateSuppliersCommand {
    suppliername:string;
    email: string;
    phone: string;
    active:boolean

    constructor(
        suppliername: string,
        email: string,
        phone: string, 
        active: boolean) {

        this.suppliername = suppliername;
        this.email = email;
        this.phone = phone;
        this.active = active;
    }
}
