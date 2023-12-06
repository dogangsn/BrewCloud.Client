import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { CreateSaleBuyCommand } from "app/modules/admin/retail/model/CreateSaleBuyCommand";
import { CreateStoreCommand } from "app/modules/admin/store/models/CreateStoreCommand";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MailingService {
    constructor(private _httpService: HttpService) { }

    getMailSettingsList() : Observable<any> {
        return this._httpService.getRequest(endPoints.mailing.getsmptsettingsList);
    }

    updateMailSettings(model: any): Observable<any> {
        return this._httpService.post(endPoints.title.updatetitle, model);
    }

    createMailSettings(model: any): Observable<any> {
        return this._httpService.post(endPoints.title.createtitle, model);
    }

    deleteMailSettings(model: any): Observable<any> {
        return this._httpService.post(endPoints.title.deleteTitle, model);
    }
}