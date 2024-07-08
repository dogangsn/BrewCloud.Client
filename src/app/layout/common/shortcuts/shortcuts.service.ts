import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Shortcut } from 'app/layout/common/shortcuts/shortcuts.types';
import { HttpService } from 'app/core/auth/Http.service';
import { endPoints } from "environments/endPoints";
import { shortcuts } from 'app/mock-api/common/shortcuts/data';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
    providedIn: 'root'
})
export class ShortcutsService
{
    private _shortcuts: ReplaySubject<Shortcut[]> = new ReplaySubject<Shortcut[]>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _httpService: HttpService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for shortcuts
     */
    get shortcuts$(): Observable<Shortcut[]>
    {
        return this._shortcuts.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all messages
     */
    // getAll(): Observable<Shortcut[]>
    // {
    //     return this._httpClient.get<Shortcut[]>('api/common/shortcuts').pipe(
    //         tap((shortcuts) => {
    //             this._shortcuts.next(shortcuts);
    //         })
    //     );
    // }

    getAll() : Observable<Shortcut[]>{    
        return this._httpService.getRequest(endPoints.shortCuts.getShortCuts).pipe(
            tap((shortcuts)=>{
                this._shortcuts.next(shortcuts)
            })
        );
    }

    /**
     * Create a shortcut
     *
     * @param shortcut
     */
    create(shortcut: Shortcut): Observable<Shortcut>
    {
       const guid = uuidv4();
       shortcut.id=guid;
        const model = {
            shortcut:shortcut
        }
        return this.shortcuts$.pipe(
            take(1),
            switchMap(shortcuts => this._httpService.post(endPoints.shortCuts.createShortCuts, model).pipe(
                map((newShortcut) => {

                    // Update the shortcuts with the new shortcut
                    this._shortcuts.next([...shortcuts, newShortcut]);

                    // Return the new shortcut from observable
                    return newShortcut;
                })
            ))
        );
    }

    /**
     * Update the shortcut
     *
     * @param id
     * @param shortcut
     */
    update(id: string, shortcut: Shortcut): Observable<Shortcut>
    {
        const model = {
            id:id,
            shortcut:shortcut
        }
        return this.shortcuts$.pipe(
            take(1),
            switchMap(shortcuts => this._httpService.post(endPoints.shortCuts.updateShortCuts, model).pipe(
                map((updatedShortcut: Shortcut) => {

                    // Find the index of the updated shortcut
                    const index = shortcuts.findIndex(item => item.id === id);

                    // Update the shortcut
                    shortcuts[index] = updatedShortcut;

                    // Update the shortcuts
                    this._shortcuts.next(shortcuts);

                    // Return the updated shortcut
                    return updatedShortcut;
                })
            ))
        );
    }

    /**
     * Delete the shortcut
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        return this.shortcuts$.pipe(
            take(1),
            switchMap(shortcuts => this._httpService.delete(endPoints.shortCuts.deleteShortCuts, {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted shortcut
                    const index = shortcuts.findIndex(item => item.id === id);

                    // Delete the shortcut
                    shortcuts.splice(index, 1);

                    // Update the shortcuts
                    this._shortcuts.next(shortcuts);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}
