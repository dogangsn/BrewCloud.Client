import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { customersListDto } from '../models/customersListDto';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCustomerAddDialogComponent } from './dialogs/create-edit-customeradd';

@Component({
    selector: 'customerslist',
    templateUrl: './customerlist.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CustomersListComponent {
    displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'phoneNumber2', 'eMail','note'];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    customerlist: customersListDto[] = [];
    dataSource = new MatTableDataSource<customersListDto>(this.customerlist);
    
    constructor(private _CustomerListService: CustomerService,
                private _dialog: MatDialog
                ) {}
    
    ngOnInit() {
        this.getCustomerList();
    }
    
    getCustomerList() {
        this._CustomerListService.getcustomerlist().subscribe((response) => {
            this.customerlist = response.data;
            console.log(this.customerlist);
        });
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        const dialog = this._dialog
            .open(CreateEditCustomerAddDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    this.getCustomerList();
                }
            });
    }
    
}

