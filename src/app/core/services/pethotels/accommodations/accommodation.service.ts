import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateUnitsCommand } from "app/modules/admin/definition/unitdefinition/models/CreateUnitsCommand";
import { CreateVaccineCommand } from "app/modules/admin/definition/vaccinelist/models/createVaccineCommand";
import { CreateRoomCommand } from "app/modules/admin/pethotels/accommodationrooms/models/createRoomCommand";
import { CreateAccomodationCommand } from "app/modules/admin/pethotels/accommodations/models/createAccomodationCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AccommodationsService {
    constructor(private _httpService: HttpService) { }

    getAccomodationList(model: any) : Observable<any>{
        return this._httpService.post(endPoints.pethotels.getAccomodationList, model);
    }

    createAccommodation(model: CreateAccomodationCommand): Observable<any> {
        return this._httpService.post(endPoints.pethotels.createAccommodation, model);
    }

    // updateRoom(model: any): Observable<any> {
    //     return this._httpService.post(endPoints.pethotels.updateRoom, model);
    // }

    deleteAccomodation(model: any): Observable<any> {
        return this._httpService.post(endPoints.pethotels.deleteAccomodation, model);
    }


}