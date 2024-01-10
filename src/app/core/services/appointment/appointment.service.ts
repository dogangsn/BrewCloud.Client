import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { AppointmentDto } from "app/modules/admin/appointment/models/appointmentDto";
import { CreateAppointmentCommand } from "app/modules/admin/appointment/models/createAppointmentCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AppointmentService {
    constructor(private _httpService: HttpService) { }

    getAppointmentslist() : Observable<any>{    
        return this._httpService.getRequest(endPoints.appointments.appointmensList);
    }

    createAppointment(model: CreateAppointmentCommand): Observable<any> {
        return this._httpService.post(endPoints.appointments.createappointment, model);
    }

    deleteAppointment(model: any) : Observable<any> {
        return this._httpService.post(endPoints.appointments.deleteappointment, model);
    }

    updateAppointmentById(model: AppointmentDto): Observable<any> {
        return this._httpService.post(endPoints.appointments.updateappointment, model);
    }
    
    getUserTitleList(): Observable<any> {
        return this._httpService.getRequest(endPoints.appointments.getvetuserslist);
    }

    getAppointmentsByIdList(model: any) : Observable<any> {
        return this._httpService.post(endPoints.appointments.appointmentsByIdList, model);
    }

    updatePaymentReceivedAppointment(model: any) : Observable<any> {
        return this._httpService.post(endPoints.appointments.updatePaymentReceivedAppointment, model);
    }

    updateCompletedAppointment(model: any) : Observable<any> {
        return this._httpService.post(endPoints.appointments.updateCompletedAppointment, model);
    }

}