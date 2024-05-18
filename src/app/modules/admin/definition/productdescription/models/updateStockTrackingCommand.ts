import { ProcessTypes, StockTrackingType } from "./CreateStockTrackingCommand";

export class UpdateStockTrackingCommand {
    id :string;
    ProductId: string;
    Status: boolean = true;
    ProcessType: ProcessTypes = ProcessTypes.NewStock;
    Type: StockTrackingType;
    Piece: number;
    PurchasePrice: number;
    SupplierId?: string;
    ExpirationDate?: Date;

    constructor(id: string,productId: string, type: StockTrackingType, piece: number, purchasePrice: number ,supplierId?: string, expirationDate?: Date) {
        this.id = id; 
        this.ProductId = productId;
        this.Type = type;
        this.Piece = piece;
        this.PurchasePrice = purchasePrice;
        this.SupplierId = supplierId;
        this.ExpirationDate = expirationDate;
    }

}