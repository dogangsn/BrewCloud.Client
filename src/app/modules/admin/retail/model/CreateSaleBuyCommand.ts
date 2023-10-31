export class CreateSaleBuyCommand {
    customerId: string;
    date: string;
    productId: string;
    remark: string;
    type: number;
    supplierId: string;
    invoiceNo: string;
    paymentType: number;
    amount: number;

    constructor(customerId: string, date: string, productId:string, remark: string, type:number, supplierId:string, invoiceNo:string, paymentType: number, amount: number) {
        this.customerId = customerId;
        this.date = date;
        this.productId = productId;
        this.remark = remark;
        this.type = type;
        this.supplierId = supplierId;
        this.invoiceNo = invoiceNo;
        this.paymentType = paymentType;
        this.amount = amount;
    }
}