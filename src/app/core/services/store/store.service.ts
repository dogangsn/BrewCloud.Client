import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateStoreCommand } from "app/modules/admin/store/models/CreateStoreCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class StoreService {
    constructor(private _httpService: HttpService) { }

    getStoreList() : Observable<any>{
        return this._httpService.getRequest(endPoints.store.storeList);
    }

    createStores(model:  CreateStoreCommand): Observable<any> {
        return this._httpService.post(endPoints.store.createStore, model);
    }


}