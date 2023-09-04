export class CreateSaleBuyCommand {
    customerId: string;
    date: string;
    productId: string;
    remark: string;
    type: number;
    supplierId: string;
    invoiceNo: string;

    constructor(customerId: string, date: string, productId:string, remark: string, type:number, supplierId:string, invoiceNo:string) {
        this.customerId = customerId;
        this.date = date;
        this.productId = productId;
        this.remark = remark;
        this.type = type;
        this.supplierId = supplierId;
        this.invoiceNo = invoiceNo;
    }
}