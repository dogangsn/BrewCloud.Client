export class CreateDemandProductsCommand {
    id: string;
    remark:string;
    quantity:number;
    unitprice:number;
    amount:number;
    stockState:number;
    isactive:number;
    reserved:number;
    barcode:string;

    constructor(
        id: string ,
        remark:string,
        quantity:number,
        unitprice:number,
        amount:number,
        stockState:number,
        isactive:number,
        reserved:number,
        barcode:string,
        ) {
        this.id = id;
        this.remark = remark;
        this.quantity = quantity;
        this.unitprice = unitprice;
        this.amount = amount;
        this.stockState = stockState;
        this.isactive = isactive;
        this.reserved = reserved;
        this.barcode = barcode;

    }
}
