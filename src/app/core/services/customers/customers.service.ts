import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateCustomerCommand } from "app/modules/admin/customer/customeradd/models/CreateCustomerCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    constructor(private _httpService: HttpService) { }

    getcustomerlist() : Observable<any>{
        return this._httpService.getRequest(endPoints.customers.customerslist);
    }

    createCustomers(model: CreateCustomerCommand): Observable<any> {
        return this._httpService.post(endPoints.customers.createCustomers, model);
    }

}