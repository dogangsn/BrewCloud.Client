import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateCasingDefinitionCommand } from "app/modules/admin/definition/casingdefinition/models/CreateCasingDefinitionCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CasingDefinitionService {
    constructor(private _httpService: HttpService) { }

    getCasingDefinitionList() : Observable<any>{
        return this._httpService.getRequest(endPoints.casedefinition.casedefinitionList);
    }

    createCasingDefinition(model: CreateCasingDefinitionCommand): Observable<any> {
        return this._httpService.post(endPoints.casedefinition.Createcasedefinition, model);
    }


}