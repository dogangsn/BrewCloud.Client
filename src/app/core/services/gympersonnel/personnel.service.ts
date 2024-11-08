import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/auth/Http.service';
import { endPoints } from 'environments/endPoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private _httpService: HttpService) { }
  getGymPersonnelList(): Observable<any> {
    return this._httpService.getRequest(endPoints.gympersonnel.getGymPersonnelList);
  }

  createGymPersonnel(model: any): Observable<any> {
    return this._httpService.post(endPoints.gympersonnel.createGymPersonnel, model);
  }

  updateGymPersonnel(model: any): Observable<any> {
    return this._httpService.post(endPoints.gympersonnel.updateGymPersonnel, model);
  }

  deleteGymPersonnel(model: any): Observable<any> {
    return this._httpService.post(endPoints.gympersonnel.deleteGymPersonnel, model);
  }

  createGymPersonnelPermission(model: any): Observable<any> {
    return this._httpService.post(endPoints.gympersonnel.createGymPersonnelPermission, model);
  }

  updateGymPersonnelPermission(model: any): Observable<any> {
    return this._httpService.post(endPoints.gympersonnel.updateGymPersonnelPermission, model);
  }

  deleteGymPersonnelPermission(model: any): Observable<any> {
    return this._httpService.post(endPoints.gympersonnel.deleteGymPersonnelPermission, model);
  }

  getGymPersonnelPermissionList(): Observable<any> {
    return this._httpService.getRequest(endPoints.gympersonnel.getGymPersonnelPermissionList);
  }

  getPersonnelListLight(): Observable<any> {
    return this._httpService.getRequest(endPoints.gympersonnel.getPersonnelListLight);
  }
}
