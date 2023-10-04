import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Tag, Agenda } from 'app/modules/admin/agenda/agenda.types';
import { endPoints } from "environments/endPoints";
import { CreateAgendaCommand } from "app/modules/admin/agenda/models/CreateAgendaCommand";
 import { DeleteAgendaCommand } from "app/modules/admin/agenda/models/DeleteAgendaCommand";
 import { UpdateAgendaCommand } from "app/modules/admin/agenda/models/UpdateAgendaCommand";
 import { HttpService } from "app/core/auth/Http.service";
import { agendaDto } from 'app/modules/admin/agenda/models/agendaDto';

@Injectable({
    providedIn: 'root'
})
export class AgendaService
{
    // Private
    private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);
    private _agenda: BehaviorSubject<Agenda | null> = new BehaviorSubject(null);
    private _agendas: BehaviorSubject<Agenda[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    // constructor(private _httpClient: HttpClient)
    // {
    // }
    constructor(private _httpService: HttpService, private _httpClient: HttpClient) { }
    getAgendaList() : Observable<any>{
        return this._httpService.getRequest(endPoints.agenda.agendaList);
    }

    createAgendas(model: any): Observable<any> {
        return this._httpService.post(endPoints.agenda.Createagenda, model);
    }
    // deleteAgenda(id?: DeleteAgendaCommand): Observable<any> {
    //     return this._httpService.post(endPoints.agenda.Deleteagenda, id);
    // }
    // updateAgenda(model: UpdateAgendaCommand): Observable<any> {
    //     return this._httpService.post(endPoints.agenda.Updateagenda, model);
    // }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    get agendasservice$(): Observable<any>
    {
        debugger;
        return this._httpService.getRequest(endPoints.agenda.agendaList);
    }
    /**
     * Getter for tags
     */
    get tags$(): Observable<Tag[]>
    {
        return this._tags.asObservable();
    }

    /**
     * Getter for agenda
     */
    get agenda$(): Observable<Agenda>
    {
        return this._agenda.asObservable();
    }

    /**
     * Getter for agendas
     */
    get agendas$(): Observable<Agenda[]>
    {
        return this._agendas.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get tags
     */
    getTags(): Observable<Tag[]>
    {
        return this._httpClient.get<Tag[]>('api/apps/tasks/tags').pipe(
            tap((response: any) => {
                this._tags.next(response);
            })
        );
    }

    /**
     * Crate tag
     *
     * @param tag
     */
    createTag(tag: Tag): Observable<Tag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<Tag>('api/apps/tasks/tag', {tag}).pipe(
                map((newTag) => {

                    // Update the tags with the new tag
                    this._tags.next([...tags, newTag]);

                    // Return new tag from observable
                    return newTag;
                })
            ))
        );
    }

    /**
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: Tag): Observable<Tag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<Tag>('api/apps/tasks/tag', {
                id,
                tag
            }).pipe(
                map((updatedTag) => {

                    // Find the index of the updated tag
                    const index = tags.findIndex(item => item.id === id);

                    // Update the tag
                    tags[index] = updatedTag;

                    // Update the tags
                    this._tags.next(tags);

                    // Return the updated tag
                    return updatedTag;
                })
            ))
        );
    }

    /**
     * Delete the tag
     *
     * @param id
     */
    deleteTag(id: string): Observable<boolean>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.delete('api/apps/tasks/tag', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted tag
                    const index = tags.findIndex(item => item.id === id);

                    // Delete the tag
                    tags.splice(index, 1);

                    // Update the tags
                    this._tags.next(tags);

                    // Return the deleted status
                    return isDeleted;
                }),
                filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.agendas$.pipe(
                    take(1),
                    map((agendas) => {

                        // Iterate through the agendas
                        agendas.forEach((agenda) => {

                            const tagIndex = agenda.tags.findIndex(tag => tag === id);

                            // If the task has a tag, remove it
                            if ( tagIndex > -1 )
                            {
                                agenda.tags.splice(tagIndex, 1);
                            }
                        });

                        // Return the deleted status
                        return isDeleted;
                    })
                ))
            ))
        );
    }

    /**
     * Get agendas
     */
    getAgenda(): Observable<Agenda[]>
    {
        return this._httpClient.get<Agenda[]>('api/apps/tasks/all').pipe(
            tap((response) => {
                this._agendas.next(response);
            })
        );
    }

    /**
     * Update agendas orders
     *
     * @param agendas
     */
    updateAgendasOrders(agendas: Agenda[]): Observable<Agenda[]>
    {
        return this._httpClient.patch<Agenda[]>('api/apps/tasks/order', {agendas});
    }

    /**
     * Search agendas with given query
     *
     * @param query
     */
    searchAgendas(query: string): Observable<Agenda[] | null>
    {
        return this._httpClient.get<Agenda[] | null>('api/apps/tasks/search', {params: {query}});
    }

    /**
     * Get task by id
     */
    getAgendaById(id: string): Observable<Agenda>
    {
        return this._agendas.pipe(
            take(1),
            map((agendas) => {

                // Find the agenda
                const agenda = agendas.find(item => item.id === id) || null;

                // Update the agenda
                this._agenda.next(agenda);

                // Return the agenda
                return agenda;
            }),
            switchMap((agenda) => {

                if ( !agenda )
                {
                    return throwError('Could not found agenda with id of ' + id + '!');
                }

                return of(agenda);
            })
        );
    }

    /**
     * Create agenda
     *
     * @param type
     */
    createAgenda(type: String,count : number): Observable<Agenda>
    {
        debugger;
        return this.agendas$.pipe(
            take(1),
            switchMap(agendas => this._httpClient.post<Agenda>('api/apps/tasks/task', {type}).pipe(
                map((newAgenda) => {

                    // Update the agendas with the new agenda
                    this._agendas.next([newAgenda, ...agendas]);

                    // Return the new agenda
                    return newAgenda;
                })
            ))
        );
    }

    /**
     * Update agenda
     *
     * @param id
     * @param agenda
     */
    updateAgenda(id: string, agenda: Agenda): Observable<Agenda>
    {
        return this.agendas$
                   .pipe(
                       take(1),
                       switchMap(agendas => this._httpClient.patch<Agenda>('api/apps/tasks/task', {
                           id,
                           agenda
                       }).pipe(
                           map((updatedAgenda) => {

                               // Find the index of the updated agenda
                               const index = agendas.findIndex(item => item.id === id);

                               // Update the agenda
                               agendas[index] = updatedAgenda;

                               // Update the agendas
                               this._agendas.next(agendas);

                               // Return the updated agenda
                               return updatedAgenda;
                           }),
                           switchMap(updatedAgenda => this.agenda$.pipe(
                               take(1),
                               filter(item => item && item.id === id),
                               tap(() => {

                                   // Update the agenda if it's selected
                                   this._agenda.next(updatedAgenda);

                                   // Return the updated agenda
                                   return updatedAgenda;
                               })
                           ))
                       ))
                   );
    }

    /**
     * Delete the agenda
     *
     * @param id
     */
    deleteAgenda(id: string): Observable<boolean>
    {
        return this.agendas$.pipe(
            take(1),
            switchMap(agendas => this._httpClient.delete('api/apps/tasks/task', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted agenda
                    const index = agendas.findIndex(item => item.id === id);

                    // Delete the agenda
                    agendas.splice(index, 1);

                    // Update the agendas
                    this._agendas.next(agendas);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}
