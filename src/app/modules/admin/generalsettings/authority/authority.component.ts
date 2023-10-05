import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormGroup,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { UserListDto } from './models/UserListDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'settings-authority',
    templateUrl: './authority.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAuthorityComponent implements OnInit {
    users: FormGroup;

    displayedColumns: string[] = ['firstName','lastName','email', 'actions'];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    userlist: UserListDto[] = [];
    dataSource = new MatTableDataSource<UserListDto>(this.userlist);

    constructor(private _formBuilder: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.users = this._formBuilder.group({
        
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
