export class demandProductsListDto {
    id: string;
    remark:string;
    quantity:number;
    unitprice:number;
    amount:number;
    stockState:number;
    isactive:number;
    reserved:number;
    barcode:string;

    // category?: string | null;
    // name?: string | null;
    // description?: string | null;
    // tags?: string[];
    // sku?: string | null;
    // brand?: string | null;
    // vendor?: string | null;
    // stock?: number | null;
    // cost?: number | null;
    // basePrice?: number | null;
    // taxPercent?: number | null;
    // price?: number | null;
    // weight?: number | null;
    // thumbnail?: string | null;
    // images?: string[] | null;
    // active?: boolean | null;
}

// export interface InventoryProduct
// {
//     id: string;
//     category?: string;
//     name: string;
//     description?: string;
//     tags?: string[];
//     sku?: string | null;
//     barcode?: string | null;
//     brand?: string | null;
//     vendor: string | null;
//     stock: number;
//     reserved: number;
//     cost: number;
//     basePrice: number;
//     taxPercent: number;
//     price: number;
//     weight: number;
//     thumbnail: string;
//     images: string[];
//     active: boolean;
// }

export interface InventoryBrand
{
    id: string;
    name: string;
    slug: string;
}


export interface InventoryCategory
{
    id: string;
    parentId: string;
    name: string;
    slug: string;
}
export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface InventoryTag
{
    id?: string;
    title?: string;
}

export interface InventoryVendor
{
    id: string;
    name: string;
    slug: string;
}