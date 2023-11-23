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
import { AgendaListByIdQuery } from 'app/modules/admin/agenda/models/AgendaListByIdQuery';
import { agendaTagsDto } from 'app/modules/admin/agenda/models/agendaTagsDto';

@Injectable({
    providedIn: 'root'
})
export class AgendaService
{
    // Private
    private _tags: BehaviorSubject<agendaTagsDto[] | null> = new BehaviorSubject(null);
    private _agenda: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _agendas: BehaviorSubject<Agenda[] | null> = new BehaviorSubject(null);
    private _agendasDto: BehaviorSubject<agendaDto[] | null> = new BehaviorSubject(null);
    private _agendaDto: BehaviorSubject<agendaDto | null> = new BehaviorSubject(null);
    private agendaList : any;
    /**
     * Constructor
     */
    // constructor(private _httpClient: HttpClient)
    // {
    // }
    constructor(private _httpService: HttpService, private _httpClient: HttpClient) { }
    getAgendaList() : Observable<any>{
        const agendaListRes = this._httpService.getRequest(endPoints.agenda.agendaList);
        agendaListRes.subscribe((response =>{
            this._agendasDto.next(response.data);
            this.getAgenda();
        }));
        return agendaListRes;
    }

    createAgendas(model: any): Observable<any> {
        return this._httpService.post(endPoints.agenda.Createagenda, model);
    }
    // deleteAgenda(id?: DeleteAgendaCommand): Observable<any> {
    //     return this._httpService.post(endPoints.agenda.Deleteagenda, id);
    // }
    updateAgendas(model: UpdateAgendaCommand): Observable<any> {
        return this._httpService.post(endPoints.agenda.Updateagenda, model);
    }
    updateAgendasMulti(model: UpdateAgendaCommand): Observable<any> {
        return this._httpService.post(endPoints.agenda.Updateagenda, model);
    }
    getAgendaById(buyId: string): Observable<AgendaListByIdQuery>
    {
        debugger;
        const itemBy = new AgendaListByIdQuery(
            buyId,
            0,
            0,
            0,
            '0',
            0,
            '0',
            '0',
            []

        )
        debugger;

        return new Observable<AgendaListByIdQuery>((observer) => {
            this._httpService.post(endPoints.agenda.agendaListById, itemBy).subscribe((response) => {
                if (response.isSuccessful) {
                    debugger;
                    const responses = response.data;
                   
                    if(responses !== null && responses !== undefined)
                    {
                        const agenda1   = responses.find((x) => x.id === buyId) || null;
                        this._agendaDto.next(agenda1);
                        this._agendas.pipe().subscribe((response)=>{
                            const req = response[0];
                            debugger;
                                if(req !== null && req !== undefined )
                                {
                                    const agenda = req;
                                    debugger;
                                // Update the agenda
                                this._agenda.next(agenda);
                                observer.next(agenda1); 
                                observer.complete(); 
                                return agenda;
                                }
                        });


                        // this._agendas.pipe(
                        //     take(1),
                        //     map((agendas) => {
                        //         // Find the agenda
                                
                                
                
                        //         // Return the agenda
                               
                        //     }),
                        //     switchMap((agenda) => {
                
                        //         if ( !agenda )
                        //         {
                        //             return throwError('Could not found agenda with id of ' + buyId + '!');
                        //         }
                
                        //         return of(agenda);
                        //     })
                        // );
                            
                    }
                    
                  
                        // if(agenda === null)
                        // {
                        //     this.getAgendaById2(buyId);
                        // }
                        // else{
                        // agenda.dueDate = new Date(agenda.dueDate);
                            
                        // }
                    

                    // }
                } else {
                    observer.error('Failed to fetch agenda by ID'); // Emit an error if needed
                }
            });
        });

        //    this._httpService.post(endPoints.agenda.agendaListById,itemBy).subscribe((response) => {
        //     if(response.isSuccessful)
        //     {
        //         const responses = response.data;
        //         this._agendaDto.next(responses.find(x=>x.id === buyId) || null);
        //         return this._agendaDto;
        //     }
        //     else{
        //         this._agendaDto.error('Failed to fetch agenda by ID');
        //     }
        //  });
        //  const ag = 
        //  this._agendasDto.pipe(
        //     take(1),
        //     map((agendas) => {
        //         debugger;
        //         // Find the task
        //         debugger;
        //         const agenda = agendas.find(x=>x.id === buyId) || null;

        //         // Update the task
        //         this._agendaDto.next(agenda);

        //         // Return the task
        //         return agenda;
        //     }),
        //     switchMap((agendass) => {

        //         if ( !agendass )
        //         {
        //             return throwError('Could not found task with id of ' + buyId + '!');
        //         }

        //         return of(agendass);
        //     })
        // );
        //  this._agenda=list;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    get agendasservice$(): Observable<any>
    {
        return this._httpService.getRequest(endPoints.agenda.agendaList);
    }
    /**
     * Getter for tags
     */
    get tags$(): Observable<agendaTagsDto[]>
    {
        return this._tags.asObservable();
    }

    /**
     * Getter for agenda
     */
    get agenda$(): Observable<Agenda>
    {
        debugger;
        return this._agenda.asObservable();
    }
    get agendaDto$(): Observable<agendaDto>
    {
        return this._agendaDto.asObservable();
    }

    /**
     * Getter for agendas
     */
    get agendas$(): Observable<Agenda[]>
    {
        return this._agendas.asObservable();
    }
    get agendasDto$(): Observable<agendaDto[]>
    {
        return this._agendasDto.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get tags
     */
    getTags(): Observable<agendaTagsDto[]>
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
    createTag(tag: agendaTagsDto): Observable<agendaTagsDto>
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
    updateTag(id: string, tag: agendaTagsDto): Observable<agendaTagsDto>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<agendaTagsDto>('api/apps/tasks/tag', {
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

                            const tagIndex = agenda.agendaTags.findIndex(tag => tag === id);

                            // If the task has a tag, remove it
                            if ( tagIndex > -1 )
                            {
                                agenda.agendaTags.splice(tagIndex, 1);
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
    getAgendaById2(id: string): Observable<Agenda>
    {
        debugger;
        return this._agendas.pipe(
            take(1),
            map((agendas) => {
                // Find the agenda
                if(agendas !== null && agendas !== undefined )
                {
                    const agenda = agendas.find(item => item.id === id) || null;
                    debugger;
                // Update the agenda
                this._agenda.next(agenda);
                return agenda;
                }
                

                // Return the agenda
               
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
    createAgenda(type: number,count : number): Observable<Agenda>
    {
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
        debugger;
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
                                   debugger;
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
