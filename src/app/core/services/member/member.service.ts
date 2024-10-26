import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/auth/Http.service';
import { endPoints } from 'environments/endPoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _httpService: HttpService) { }

  createMember(model: any): Observable<any> {
    return this._httpService.post(endPoints.member.createMember, model);
  }
}
