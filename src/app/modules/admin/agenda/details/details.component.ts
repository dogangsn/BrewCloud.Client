import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup,Validators,FormGroup } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { debounceTime, filter, Subject, takeUntil, tap } from 'rxjs';
import { assign } from 'lodash-es';
import { DateTime } from 'luxon';
import { Tag, Agenda } from 'app/modules/admin/agenda/agenda.types';
import { AgendaListComponent } from 'app/modules/admin/agenda/list/list.component';
import { AgendaService } from 'app/core/services/Agenda/agenda.service';
import { CreateAgendaCommand } from '../models/CreateAgendaCommand';
import { DeleteAgendaCommand } from '../models/DeleteAgendaCommand';
import { UpdateAgendaCommand } from '../models/UpdateAgendaCommand';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { agendaTagsDto } from '../models/agendaTagsDto';
@Component({
    selector       : 'Agenda-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaDetailsComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('titleField') private _titleField: ElementRef;
    displayedColumns: string[] = ['agendano'
    ,'agendatype'
    ,'isactive' 
    ,'agendatitle'
    ,'priority'
    ,'duedate'
    ,'notes'
    ,'agendatags',
    ];
    tags: Tag[];
    tag : agendaTagsDto[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    agenda: Agenda;
    AgendaForm: FormGroup;
    agendas: Agenda[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    newtag : agendaTagsDto;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _AgendaListComponent: AgendaListComponent,
        private _AgendaService: AgendaService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _translocoService: TranslocoService

    )
    {
    }
    closePage(): void {
        // Sayfayı kapatma işlemleri burada gerçekleştirilir
        this._router.navigate(['../agenda/']); // Örneğin, üst düzey sayfaya yönlendirme
        this._AgendaListComponent.visible = true;
    }
    visible: boolean = true;

    // saveAgendadetail(type: 'agenda' | 'section'): void
    // {
    //    const types = type;
       
    //     // Create the agenda
    //     // this._agendaService.createAgenda(type).subscribe((newAgenda) => {

    //     //     // Go to the new agenda
    //     //     this._router.navigate(['./', newAgenda.id], {relativeTo: this._activatedRoute});

    //     //     // Mark for check
    //     //     this._changeDetectorRef.markForCheck();
    //     //         this.visible = false;
   

            
    //     // });
    // }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.AgendaForm = this._formBuilder.group({
            agendano: ['', Validators.required],
            agendatype: ['', Validators.required],
            isactive: ['', Validators.required],
            agendatitle: ['', Validators.required],
            priority: ['', Validators.required],
            duedate: [''],
            notes: ['', Validators.required],
            agendatags: ['', Validators.required],
        })
            
        // Open the drawer
        this._AgendaListComponent.matDrawer.open();

        // Create the Agenda form
        // this.AgendaForm = this._formBuilder.group({
        //     id       : [''],
        //     type     : [''],
        //     title    : [''],
        //     notes    : [''],
        //     completed: [false],
        //     dueDate  : [null],
        //     priority : [0],
        //     tags     : [[]],
        //     order    : [0]
        // });

        // Get the tags
        this._AgendaService.tags$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tags: Tag[]) => {
                this.tags = tags;
                this.filteredTags = tags;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the Agendas
        this._AgendaService.agendas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((agenda: Agenda[]) => {
                this.agendas = agenda;
                this._AgendaListComponent.visible = false;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the Agenda
        this._AgendaService.agenda$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((agenda: Agenda) => {

                // Open the drawer in case it is closed
                this._AgendaListComponent.matDrawer.open();

                // Get the Agenda
                this.agenda = agenda;

                // Patch values to the form from the Agenda
                this.AgendaForm.patchValue(agenda, {emitEvent: false});

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Update Agenda when there is a value change on the Agenda form
        this.AgendaForm.valueChanges
            .pipe(
                tap((value) => {
                    
                    // Update the Agenda object
                    this.agenda = assign(this.agenda, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {

                // Update the Agenda on the server
                this._AgendaService.updateAgenda(value.id, value).subscribe();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for NavigationEnd event to focus on the title field
        this._router.events
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => {

                // Focus on the title field
                this._titleField.nativeElement.focus();
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Listen for matDrawer opened change
        this._AgendaListComponent.matDrawer.openedChange
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(opened => opened)
            )
            .subscribe(() => {

                // Focus on the title element
                this._titleField.nativeElement.focus();
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

        // Dispose the overlay
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._AgendaListComponent.matDrawer.close();
    }

    /**
     * Toggle the completed status
     */
    toggleCompleted(): void
    {
        // Get the form control for 'completed'
        const completedFormControl = this.AgendaForm.get('isactive');

        // Toggle the completed status
        completedFormControl.setValue(!completedFormControl.value);
    }

    /**
     * Open tags panel
     */
    openTagsPanel(): void
    {
        // Create the overlay
        this._tagsPanelOverlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
                                  .withFlexibleDimensions(true)
                                  .withViewportMargin(64)
                                  .withLockedPosition(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      }
                                  ])
        });

        // Subscribe to the attachments observable
        this._tagsPanelOverlayRef.attachments().subscribe(() => {

            // Focus to the search input once the overlay has been attached
            this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._tagsPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._tagsPanelOverlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._tagsPanelOverlayRef.backdropClick().subscribe(() => {

            // If overlay exists and attached...
            if ( this._tagsPanelOverlayRef && this._tagsPanelOverlayRef.hasAttached() )
            {
                // Detach it
                this._tagsPanelOverlayRef.detach();

                // Reset the tag filter
                this.filteredTags = this.tags;

                // Toggle the edit mode off
                this.tagsEditMode = false;
            }

            // If template portal exists and attached...
            if ( templatePortal && templatePortal.isAttached )
            {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void
    {
        this.tagsEditMode = !this.tagsEditMode;
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void
    {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    filterTagsInputKeyDown(event): void
    {
        // Return if the pressed key is not 'Enter'
        if ( event.key !== 'Enter' )
        {
            return;
        }

        // If there is no tag available...
        if ( this.filteredTags.length === 0 )
        {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = this.agenda.tags.find(id => id === tag.id);

        // If the found tag is already applied to the Agenda...
        if ( isTagApplied )
        {
            // Remove the tag from the Agenda
            this.deleteTagFromAgenda(tag);
        }
        else
        {
            // Otherwise add the tag to the Agenda
            this.addTagToAgenda(tag);
        }
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(title: string): void
    {
        debugger;
        const tag = {
            title
        };

        // Create tag on the server
        this._AgendaService.createTag(tag)
            .subscribe((response) => {

                // Add the tag to the Agenda
                this.addTagToAgenda(response);
            });
    }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    updateTagTitle(tag: Tag, event): void
    {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        this._AgendaService.updateTag(tag.id, tag)
            .pipe(debounceTime(300))
            .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the tag
     *
     * @param tag
     */
    deleteTag(tag: Tag): void
    {
        // Delete the tag from the server
        this._AgendaService.deleteTag(tag.id).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add tag to the Agenda
     *
     * @param tag
     */
    addTagToAgenda(tag: Tag): void
    {
        debugger;
        // Add the tag
        this.agenda.tags.unshift(tag.id);

        // Update the Agenda form
        // this.AgendaForm.get('tags').patchValue(this.agenda.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete tag from the agenda
     *
     * @param tag
     */
    deleteTagFromAgenda(tag: Tag): void
    {
        // Remove the tag
        this.agenda.tags.splice(this.agenda.tags.findIndex(item => item === tag.id), 1);

        // Update the Agenda form
        this.AgendaForm.get('tags').patchValue(this.agenda.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle Agenda tag
     *
     * @param tag
     */
    toggleAgendaTag(tag: Tag): void
    {
        if ( this.agenda.tags.includes(tag.id) )
        {
            this.deleteTagFromAgenda(tag);
        }
        else
        {
            this.addTagToAgenda(tag);
        }
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean
    {
        return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
    }

    /**
     * Set the Agenda priority
     *
     * @param priority
     */
    setAgendaPriority(priority): void
    {
        // Set the value
        this.AgendaForm.get('priority').setValue(priority);
    }

    /**
     * Check if the Agenda is overdue or not
     */
    isOverdue(): boolean
    {
        return DateTime.fromISO(this.agenda.duedate).startOf('day') < DateTime.now().startOf('day');
    }

    /**
     * Delete the Agenda
     */
    deleteAgenda(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete Agenda',
            message: 'Bu Gündemi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {

                // Get the current Agenda's id
                const id = this.agenda.id;

                // Get the next/previous Agenda's id
                const currentAgendaIndex = this.agendas.findIndex(item => item.id === id);
                const nextAgendaIndex = currentAgendaIndex + ((currentAgendaIndex === (this.agendas.length - 1)) ? -1 : 1);
                const nextAgendaId = (this.agendas.length === 1 && this.agenda[0].id === id) ? null : this.agendas[nextAgendaIndex].id;

                // Delete the Agenda
                this._AgendaService.deleteAgenda(id)
                    .subscribe((isDeleted) => {

                        // Return if the Agenda wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next Agenda if available
                        if ( nextAgendaId )
                        {
                            this._router.navigate(['../', nextAgendaId], {relativeTo: this._activatedRoute});
                        }
                        // Otherwise, navigate to the parent
                        else
                        {
                            this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                        }
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    saveAgendadetail(type: 'agenda' | 'section') : void{
        const types = type;
        const typenumber = type=='agenda' ? 0 : 1;
        const agendaItem = new CreateAgendaCommand( 
            this.getFormValueByName('agendano'),
            this.getFormValueByName('agendatype'),
            this.getFormValueByName('isactive'),
            this.getFormValueByName('agendatitle'),
            this.getFormValueByName('priority'),
            this.getFormValueByName('notes'),
            this.getFormValueByName('duedate'),
            this.getFormValueByName('agendatags'),


            );
            agendaItem.agendano = this._AgendaListComponent.agendasCount.total;
            agendaItem.agendatags = [];
            agendaItem.agendatype = typenumber;
            agendaItem.isactive = this.agenda.isactive == true ? 1 : 0;
            this.filteredTags = this.tags.filter(tag => this.agenda.tags.includes(tag.id));
            for (const item of this.filteredTags) {
                const newTag: agendaTagsDto = {
                  id  : '00000000-0000-0000-0000-000000000000',
                  tags: item.title,
                  tagsId: item.id,
                };
                try
                {
                    agendaItem.agendatags.push(newTag);

                }
                catch(error){
                    console.error(error);
                }
            }


        
            this._AgendaService.createAgendas(agendaItem).subscribe(
                (response) => {
                    
                if (response.isSuccessful) {
                    this.showSweetAlert('success');
                } else {
                     this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );

    }
    showSweetAlert(type: string): void {
        if (type === 'success') {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.success'),
                this.translate('sweetalert.transactionSuccessful'),
                SweetalertType.success
            );
            GeneralService.sweetAlert(sweetAlertDto);
        } else {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.error'),
                this.translate('sweetalert.transactionFailed'),
                SweetalertType.error
            );
            GeneralService.sweetAlert(sweetAlertDto);
        }
    }
    getFormValueByName(formName: string): any {
        return this.AgendaForm.get(formName).value;
    }
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
    translate(key: string): any {
        return this._translocoService.translate(key);
    }
}
