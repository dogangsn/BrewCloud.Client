import { Injectable } from "@angular/core";
import { HttpService } from "app/core/auth/Http.service";
import { Items, Item } from "app/modules/admin/file-manager/models/file-manager.types";
import { endPoints } from "environments/endPoints";
import { BehaviorSubject, Observable, map, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})


export class FileManagerService {

    private _item: BehaviorSubject<Item | null> = new BehaviorSubject(null);
    private _items: BehaviorSubject<Items | null> = new BehaviorSubject(null);

    constructor(private _httpService: HttpService) { }

    get items$(): Observable<Items> {
        return this._items.asObservable();
    }

    get item$(): Observable<Item> {
        return this._item.asObservable();
    }

    getFileManagerList(): Observable<any> {
        return this._httpService.getRequest(endPoints.filemanager.getFileManager);
    }

    createFileManager(model: any): Observable<any> {
        return this._httpService.post(endPoints.filemanager.createFileManager, model);
    }

    deleteFileManager(model : any) : Observable<any> {
        return this._httpService.post(endPoints.filemanager.deleteFileManager, model);
    }

    getItemById(model: any): Observable<any> {
        return this._httpService.post(endPoints.filemanager.getItemById, model)
            .pipe(
                take(1),
                map((items) => {

                    const item = [...items.data.files].find(value => value.id === model.id) || null;

                    this._item.next(item);

                    return item;
                }),
            );
    }

    downloadFileManager(model: any) : Observable<any> {
        return this._httpService.post(endPoints.filemanager.downloadFileManager, model);
    }

}