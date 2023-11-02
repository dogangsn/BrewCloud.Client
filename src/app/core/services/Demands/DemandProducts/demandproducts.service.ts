import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { BehaviorSubject, filter, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryTag, InventoryVendor } from 'app/modules/admin/demands/demand1/models/demandProductsListDto';
// import { CreateCasingDefinitionCommand } from "app/modules/admin/definition/casingdefinition/models/CreateCasingDefinitionCommand";
// import { DeleteCasingDefinitionCommand } from "app/modules/admin/definition/casingdefinition/models/DeleteCasingDefinitionCommand";
// import { UpdateCasingDefinitionCommand } from "app/modules/admin/definition/casingdefinition/models/UpdateCasingDefinitionCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";
import { demandProductsListDto } from "app/modules/admin/demands/demand1/models/demandProductsListDto";
import { CreateDemandProductsCommand } from "app/modules/admin/demands/demand1/models/CreateDemandProductsCommand";
import { DeleteDemandProductsCommand } from "app/modules/admin/demands/demand1/models/DeleteDemandProductsCommand";

import { demandsListDto } from "app/modules/admin/demands/models/demandListDto";
import { CreateDemandCommand } from "app/modules/admin/demands/models/CreateDemandCommand";
import { DeleteDemandCommand } from "app/modules/admin/demands/models/DeleteDemandCommand";
import { UpdateDemandCommand } from "app/modules/admin/demands/models/UpdateDemandCommand";

import { demandTransList } from "app/modules/admin/demands/models/demandListDto";

import { UpdateDemandProductsCommand } from "app/modules/admin/demands/demand1/models/UpdateDemandProductsCommand";
@Injectable({
    providedIn: 'root'
})

export class DemandProductsService {
    
    private _brands: BehaviorSubject<InventoryBrand[] | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<InventoryCategory[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _product: BehaviorSubject<demandProductsListDto | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<demandProductsListDto[] | null> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<InventoryTag[] | null> = new BehaviorSubject(null);
    private _vendors: BehaviorSubject<InventoryVendor[] | null> = new BehaviorSubject(null);
    constructor(private _httpService: HttpService,private _httpClient : HttpClient) { }
    getDemandProductsList() : Observable<any>{
        return this._httpService.getRequest(endPoints.demandproducts.demandproductsList);
    }

    createDemandProduct(model: CreateDemandProductsCommand): Observable<any> {
        debugger;
        return this._httpService.post(endPoints.demandproducts.Createdemandproducts, model);
    }
    deleteDemandProduct(model: DeleteDemandProductsCommand): Observable<any> {
        return this._httpService.post(endPoints.demandproducts.Deletedemandproducts, model);
    }
    updateDemandProduct(model: UpdateDemandProductsCommand): Observable<any> {
        return this._httpService.post(endPoints.demandproducts.Updatedemandproducts, model);
    }
    
    getDemandTransList(model : any): Observable<any>{
        debugger;
        return this._httpService.post(endPoints.demandTrans.demandsTransList,model);
    }

    getDemandLists() : Observable<any>{
        return this._httpService.getRequest(endPoints.demands.demandsList);
    }

    createDemands(model: CreateDemandCommand): Observable<any> {
        return this._httpService.post(endPoints.demands.createdemand, model);
    }
    deleteDemands(model: DeleteDemandCommand): Observable<any> {
        return this._httpService.post(endPoints.demands.deletedemand, model);
    }
    updateDemands(model: UpdateDemandCommand): Observable<any> {
        return this._httpService.post(endPoints.demands.updatedemand, model);
    }

    getProducts(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: InventoryPagination; products: demandProductsListDto[] }>
    {
        debugger;
        return this._httpClient.get<{ pagination: InventoryPagination; products: demandProductsListDto[] }>('api/apps/ecommerce/inventory/products', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._products.next(response.products);
            })
        );
    }
    getProductById(id: string): Observable<demandProductsListDto>
    {
        debugger;
        return this._products.pipe(
            take(1),
            map((products) => {

                // Find the product
                const product = products.find(item => item.id === id) || null;

                // Update the product
                this._product.next(product);

                // Return the product
                return product;
            }),
            switchMap((product) => {

                if ( !product )
                {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(product);
            })
        );
    }
    createProduct(): Observable<demandProductsListDto>
    {
        debugger;
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<demandProductsListDto>('api/apps/ecommerce/inventory/product', {}).pipe(
                map((newProduct) => {

                    // Update the products with the new product
                    this._products.next([newProduct, ...products]);
                    debugger;
                    // Return the new product
                    return newProduct;
                })
            ))
        );
    }
    get products$(): Observable<demandProductsListDto[]>
    {
        return this._products.asObservable();
    }

}
