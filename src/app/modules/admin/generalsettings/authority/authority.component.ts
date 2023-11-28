import {
    AfterViewInit,
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
import { UsersService } from 'app/core/services/settings/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUsersDialogComponent } from './dialogs/create-edit-users';

@Component({
    selector: 'settings-authority',
    templateUrl: './authority.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAuthorityComponent implements OnInit, AfterViewInit {
    users: FormGroup;

    pageSizeOptions = [5, 10, 20];
    pageSize = 5;
    pageIndex = 0;

    isUpdateButtonActive: boolean;

    displayedColumns: string[] = ['firstName', 'email', 'actions'];

    @ViewChild('paginator') paginator: MatPaginator;
    userlist: UserListDto[] = [];
    dataSource = new MatTableDataSource<UserListDto>(this.userlist);
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _usersService: UsersService,
        private _dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getUsersList();
        this.dataSource.paginator = this.paginator;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getUsersList(): void {
        this._usersService.getUsersList().subscribe((response) => {
            this.userlist = response.data;
            this.dataSource = new MatTableDataSource<UserListDto>(
                this.userlist
            );

            this.dataSource.paginator = this.paginator;
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        this.isUpdateButtonActive = false;
        const dialog = this._dialog
            .open(CreateEditUsersDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                debugger;
                if (response.status) {
                    this.getUsersList();
                }
            });
    }

    onPageChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
    }
}
