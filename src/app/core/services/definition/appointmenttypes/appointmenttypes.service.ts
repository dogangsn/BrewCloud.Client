import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateAnimalColorsDefCommand } from "app/modules/admin/customer/models/CreateAnimalColorsDefCommand";
import { CreateCustomerGroupCommand } from "app/modules/admin/definition/customergroup/models/CreateCustomerGroupCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AppointmentTypeservice {
    
    
    constructor(private _httpService: HttpService) { }

    getAppointmentTypes() : Observable<any>{
        return this._httpService.getRequest(endPoints.appointmenttypes.getAppointmentTypes);
    }


}
