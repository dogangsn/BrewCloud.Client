import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateStockTrackingCommand } from "app/modules/admin/definition/productdescription/models/CreateStockTrackingCommand";
import { CreateTaxisCommand } from "app/modules/admin/definition/taxes/models/CreateTaxisCommand";
import { UpdateTaxisCommand } from "app/modules/admin/definition/taxes/models/UpdateTaxisCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class StockTrackingService {
    
    constructor(private _httpService: HttpService) { }

    getStockTrackingFilterProduct(model : any) : Observable<any>{
        return this._httpService.post(endPoints.stocktracking.getstockTrackingProductFilter, model);
    }

    createStockTracking(model: CreateStockTrackingCommand): Observable<any> {
        return this._httpService.post(endPoints.stocktracking.createStockTracking, model);
    }

    // deleteTaxis(model: any): Observable<any> {
    //     return this._httpService.post(endPoints.taxis.deleteTaxis, model);
    // }

    // updateTaxis(model: UpdateTaxisCommand): Observable<any> {
    //     return this._httpService.post(endPoints.taxis.updateTaxis, model);
    // }
}
