export class ProductDescriptionsDto{
    id: string;
    name:string;
    productBarcode: string;
    productCode: string;
    buyingPrice:number;
    sellingPrice: number;
    active: boolean;
    productTypeId: number;
    sellingIncludeKDV: boolean;
    buyingIncludeKDV: boolean;
    fixPrice: boolean;
    isExpirationDate: boolean;
    ratio: number;
}