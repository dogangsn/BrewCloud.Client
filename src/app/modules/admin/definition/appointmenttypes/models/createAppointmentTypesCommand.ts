export class CreateAppointmentTypesCommand {
    remark: string = '';
    isDefaultPrice: boolean = false;
    price: number;
    taxisId: string;

    constructor(price: number, taxisId: string, remark: string = '', isDefaultPrice: boolean = false) {
        this.price = price;
        this.taxisId = taxisId;
        this.remark = remark;
        this.isDefaultPrice = isDefaultPrice;
    }
}