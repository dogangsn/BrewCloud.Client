import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductDescriptionService {
    constructor(private _httpService: HttpService) { }

    GetProductDescriptionList() : Observable<any>{
        return this._httpService.getRequest(endPoints.productdescription.productdescriptionList);
    }


}