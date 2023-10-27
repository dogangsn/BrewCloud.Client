import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateSaleBuyCommand } from "app/modules/admin/retail/model/CreateSaleBuyCommand";
import { CreateStoreCommand } from "app/modules/admin/store/models/CreateStoreCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SaleBuyService {
    constructor(private _httpService: HttpService) { }

    getBuySaleList(model :any) : Observable<any>{
        return this._httpService.post(endPoints.saleBuy.saleBuyList, model);
    }

    createSaleBuy(model:  CreateSaleBuyCommand): Observable<any> {
        return this._httpService.post(endPoints.saleBuy.createSaleBuy, model);
    }

    // deletedStores(model: any): Observable<any> {
    //     return this._httpService.post(endPoints.store.deleteStore, model);
    // }

    // updateStores(model: any): Observable<any> {
    //     return this._httpService.post(endPoints.store.updateStore, model);
    // }
}