export class CustomerDetailDto {
    id: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    phonenumber2: string;
    email: string;
    taxoffice: string;
    vkntcno: string;
    customergroup: string;
    note: string;
    discountrate: number;
    isemail: boolean;
    isphone: boolean;
    adressid: string;
    createdate: string;
    city: string;
    district: string;
    longadress: string;

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phonenumber: string,
        phonenumber2: string,
        email: string,
        taxoffice: string,
        vkntcno: string,
        customergroup: string,
        note: string,
        discountrate: number,
        isemail: boolean,
        isphone: boolean,
        adressid: string,
        createdate: string,
        city: string,
        district: string,
        longadress: string) {

        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.phonenumber2 = phonenumber2;
        this.email = email;
        this.taxoffice = taxoffice;
        this.vkntcno = vkntcno;
        this.customergroup = customergroup;
        this.note = note;
        this.discountrate = discountrate;
        this.isemail = isemail;
        this.isphone = isphone;
        this.adressid = adressid;
        this.createdate = createdate;
        this.city = city;
        this.district = district;
        this.longadress = longadress;
    }

}