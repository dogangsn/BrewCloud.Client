import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Tag, Agenda } from 'app/modules/admin/agenda/agenda.types';
import { AgendaService } from 'app/core/services/Agenda/agenda.service';
import { agendaDto } from '../models/agendaDto';

@Component({
    selector       : 'agendas-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    selectedAgenda: Agenda;
    tags: Tag[];
    agendas: agendaDto[];
    agendasCount: any = {
        completed : 0,
        incomplete: 0,
        total     : 0
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _agendaService: AgendaService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    visible: boolean = true;
    visible2: boolean = true;
    agendaDtos = new agendaDto;
    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the tags
        this._agendaService.tags$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tags: Tag[]) => {
                this.tags = tags;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            
        // Get the Agendas
        this._agendaService.getAgendaList()
            .subscribe((response) =>{
                this.agendas = response.data;
                debugger;
                // Update the counts
            
                this.agendasCount.total = this.agendas.filter(agenda => agenda.agendatype === 0).length;
                this.agendasCount.completed = this.agendas.filter(agenda => agenda.agendatype === 0 && agenda.isactive).length;
                this.agendasCount.incomplete = this.agendasCount.total - this.agendasCount.completed;

                // Mark for check
                this._changeDetectorRef.markForCheck();

                // Update the count on the navigation
                setTimeout(() => {

                    // Get the component -> navigation data -> item
                    const mainNavigationComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

                    // If the main navigation component exists...
                    if ( mainNavigationComponent )
                    {
                        
                        const mainNavigation = mainNavigationComponent.navigation;
                        const menuItem = this._fuseNavigationService.getItem('agenda', mainNavigation);

                            
                            menuItem.subtitle = this.agendasCount.incomplete.toString() + ' kalan Ajanda';
   
                           // Refresh the navigation
                           mainNavigationComponent.refresh();

                        // Update the subtitle of the item
                        }
                });
            });

        // Get the agendas
        // this._agendaService.agenda$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((agenda: Agenda) => {
        //         this.selectedAgenda = agenda;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {

                // Calculate the drawer mode
                this.drawerMode = state.matches ? 'side' : 'over';

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(event =>
                    (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                    && (event.key === '/' || event.key === '.') // '/' or '.' key
                )
            )
            .subscribe((event: KeyboardEvent) => {

                // If the '/' pressed
                if ( event.key === '/' )
                {
                    this.createAgenda('0');
                }

                // If the '.' pressed
                if ( event.key === '.' )
                {
                    this.createAgenda('1');
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        debugger;
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create agendas
     *
     * @param type
     */
    createAgenda(type: '0' | '1'): void
    {
        debugger;
        // Create the agendas
        this._agendaService.createAgenda(type,this.agendasCount).subscribe((newAgenda) => {

            // Go to the new agendas
            this._router.navigate(['./', newAgenda.id], {relativeTo: this._activatedRoute});

            // Mark for check
            this._changeDetectorRef.markForCheck();
                this.visible = false;
   

            
        });
    }

    /**
     * Toggle the completed status
     * of the given agendas
     *
     * @param agenda
     */
    // toggleCompleted(agendas: Agenda): void
    // {
    //     // Toggle the completed status
    //     debugger;
    //     agendas.isactive = !agendas.isactive;

    //     // Update the agendas on the server
    //     debugger;
    //   //sonra bakılacak deniz ==>  this._agendaService.updateAgenda(agendas.id, agendas).subscribe();

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * agendas dropped
     *
     * @param event
     */
    // dropped(event: CdkDragDrop<Agenda[]>): void
    // {
    //     // Move the item in the array
    //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    //     // Save the new order
    //     this._agendaService.updateAgendasOrders(event.container.data).subscribe();

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
