import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AgendaService } from 'app/core/services/Agenda/agenda.service';
import { Tag, Agenda } from 'app/modules/admin/agenda/agenda.types';

@Injectable({
    providedIn: 'root'
})
export class AgendaTagsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _agendaService: AgendaService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]>
    {
        return this._agendaService.getTags();
    }
}

@Injectable({
    providedIn: 'root'
})
export class AgendaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _agendaService: AgendaService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agenda[]>
    {
        return this._agendaService.getAgenda();
    }
}

@Injectable({
    providedIn: 'root'
})
export class AgendasAgendaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _agendaService: AgendaService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agenda>
    {
        return this._agendaService.getAgendaById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested task is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}
