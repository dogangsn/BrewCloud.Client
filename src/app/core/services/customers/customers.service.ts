import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateCustomerCommand } from "app/modules/admin/customer/models/CreateCustomerCommand";
import { CustomerDetailDto } from "app/modules/admin/customer/models/CustomerDetailDto";
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

    createCustomers(model: any): Observable<any> {
        return this._httpService.post(endPoints.customers.createCustomers, model);
    }

    getVetVetAnimalsType() : Observable<any> {
        return this._httpService.getRequest(endPoints.customers.animalsTypeList);
    }

    getAnimalBreedsDefList() : Observable<any> {
        return this._httpService.getRequest(endPoints.customers.animalBreedsDefList);
    }

    deleteCustomers(model: any) : Observable<any> {
        return this._httpService.post(endPoints.customers.deleteCustomer, model);
    }

    getCustomersFindById(model: any) : Observable<any> {
        return this._httpService.post(endPoints.customers.getCustomersFindById, model);
    }

    updateCustomerById(model: any): Observable<any> {
        return this._httpService.post(endPoints.customers.updateCustomerById, model);
    }

    createPatients(model: any): Observable<any> {
        return this._httpService.post(endPoints.customers.createPatient, model);
    }

    deletePatients(model: any) : Observable<any> {
        return this._httpService.post(endPoints.customers.deletePatient, model);
    }

}