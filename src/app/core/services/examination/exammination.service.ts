import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { endPoints } from "environments/endPoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ExaminationService {
    constructor(private _httpService: HttpService) { }

    getExaminationlist() : Observable<any>{    
        return this._httpService.getRequest(endPoints.examinations.examinationlist);
    }

    createExamination(model: any): Observable<any> {
        return this._httpService.post(endPoints.examinations.createExamination, model);
    }

}