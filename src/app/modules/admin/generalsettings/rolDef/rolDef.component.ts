import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RoleSettingDto } from './models/RoleSettingDto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector       : 'settings-rolDef',
    templateUrl    : './rolDef.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsRolDefComponent implements OnInit
{
    notificationsForm: UntypedFormGroup;

    displayedColumns: string[] = ['rolName'
    ,'actions',];
    rolDef: FormGroup;
      
    @ViewChild(MatPaginator) paginator: MatPaginator;
    rols: RoleSettingDto[] = [];
    dataSource = new MatTableDataSource<RoleSettingDto>(this.rols);
    
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.notificationsForm = this._formBuilder.group({
        
        });
    }
}
