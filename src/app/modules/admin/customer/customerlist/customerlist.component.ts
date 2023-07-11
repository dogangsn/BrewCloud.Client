import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { customersDto } from './models/customersDto';

@Component({
    selector: 'customerslist',
    templateUrl: './customerlist.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CustomersListComponent {
    displayedColumns: string[] = ['fisrName', 'lastName', 'phoneNumber', 'phoneNumber2', 'eMail','note'];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    erpdepotcards: customersDto[] = [];
    dataSource = new MatTableDataSource<customersDto>(this.erpdepotcards);
    
    constructor(private _CustomerListService: CustomerService) {}
    
    ngOnInit() {
        this.getCustomerList();
    }
    
    getCustomerList() {
        this._CustomerListService.getcustomerlist().subscribe((response) => {
            this.erpdepotcards = response.data;
            console.log(this.erpdepotcards);
        });
    }
    
    // showSweetAlert(type: string): void {
    //     if (type === 'success') {
    //         const sweetAlertDto = new SweetAlertDto(
    //             this.translate('sweetalert.success'),
    //             this.translate('sweetalert.transactionSuccessful'),
    //             SweetalertType.success);
    //         GlobalService.sweetAlert(sweetAlertDto);
    //     }
    //     else {
    //         const sweetAlertDto = new SweetAlertDto(
    //             this.translate('sweetalert.error'),
    //             this.translate('sweetalert.transactionFailed'),
    //             SweetalertType.error);
    //         GlobalService.sweetAlert(sweetAlertDto);
    //     }
    // }
}

