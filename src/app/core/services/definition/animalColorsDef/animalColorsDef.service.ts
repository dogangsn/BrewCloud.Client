import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateCustomerGroupCommand } from "app/modules/admin/definition/customergroup/models/CreateCustomerGroupCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AnimalColorsDefService {
    constructor(private _httpService: HttpService) { }

  
    getAnimalColorsDefList() : Observable<any> {
        return this._httpService.getRequest(endPoints.animalColorsDef.animalColorsDefList);
    }





}