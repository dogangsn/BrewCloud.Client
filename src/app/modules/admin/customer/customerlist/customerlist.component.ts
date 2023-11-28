import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { customersListDto } from '../models/customersListDto';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCustomerAddDialogComponent } from './dialogs/create-edit-customeradd';
import { TranslocoService } from '@ngneat/transloco';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsComponent } from '../customerdetails/customerdetails.component';
import { CustomerDetailsService } from './service/customerdetailservice';

@Component({
    selector: 'customerslist',
    templateUrl: './customerlist.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CustomersListComponent implements OnInit, AfterViewInit  {
    displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'phoneNumber2', 'eMail','note', 'actions'];
    
    @ViewChild('paginator') paginator: MatPaginator;

    customerlist: customersListDto[] = [];
    dataSource = new MatTableDataSource<customersListDto>(this.customerlist);


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    
    constructor(private _customerListService: CustomerService,
                private _dialog: MatDialog,
                private _translocoService: TranslocoService,
                private router: Router, private route: ActivatedRoute,
                private customerDetailsService : CustomerDetailsService
                ) {}
    
    ngOnInit() {
        this.getCustomerList();
    }
    
    getCustomerList() {
        this._customerListService.getcustomerlist().subscribe((response) => {
            this.customerlist = response.data;
            console.log(this.customerlist);

            this.dataSource = new MatTableDataSource<customersListDto>(
                this.customerlist
            );

            this.dataSource.paginator = this.paginator;
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
    
    public redirectToUpdate = (id: string) => {
        console.log(id);
        this.router.navigate(['customerlist/customerdetails', id]);
    };
    
    public redirectToDelete = (id: string) => {
        const sweetAlertDto = new SweetAlertDto(
            this.translate('sweetalert.areYouSure'),
            this.translate('sweetalert.areYouSureDelete'),
            SweetalertType.warning
        );
        GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
            (swalResponse) => {
                if (swalResponse.isConfirmed) {
                    const model = {
                        id: id,
                    };
                    this._customerListService
                        .deleteCustomers(model)
                        .subscribe((response) => {
                            if (response.isSuccessful) {
                                this.getCustomerList();
                                const sweetAlertDto2 = new SweetAlertDto(
                                    this.translate('sweetalert.success'),
                                    this.translate('sweetalert.transactionSuccessful'),
                                    SweetalertType.success
                                );
                                GeneralService.sweetAlert(sweetAlertDto2);
                            } else {
                                console.error('Silme işlemi başarısız.');
                            }
                        });
                }
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

    translate(key: string): any {
        return this._translocoService.translate(key);
    }



}

