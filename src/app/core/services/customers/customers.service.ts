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

    getPatientsByCustomerId(model:any):Observable<any>{
        return this._httpService.post(endPoints.customers.getPatients, model);
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

    getTransactionMovementList(model: any) : Observable<any> {
        return this._httpService.post(endPoints.customers.getTransactionMovement, model);
    }

    getPaymentTransactionList(model: any) : Observable<any> {
        return this._httpService.post(endPoints.customers.getPaymentTransaction, model);
    }

    createCollection(model: any): Observable<any> {
        return this._httpService.post(endPoints.customers.createCollection, model);
    }

    getPayChartList(model: any): Observable<any> {
        return this._httpService.post(endPoints.customers.getpaychartList, model);
    }

    deletePayChart(model: any): Observable<any> {
        return this._httpService.post(endPoints.customers.deletePayChart, model);
    }

    sendMessage(model: any): Observable<any> {
        return this._httpService.post(endPoints.customers.sendMessage, model);
    }


}