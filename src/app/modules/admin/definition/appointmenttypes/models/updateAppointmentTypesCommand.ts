export class UpdateAppointmentTypesCommand{
    id: string;
    remark: string = '';
    isDefaultPrice: boolean = false;
    price: number;
    taxisId: string;

    constructor(id: string,price: number, taxisId: string, remark: string = '', isDefaultPrice: boolean = false) {
        this.id = id;
        this.price = price;
        this.taxisId = taxisId;
        this.remark = remark;
        this.isDefaultPrice = isDefaultPrice;
    }

}