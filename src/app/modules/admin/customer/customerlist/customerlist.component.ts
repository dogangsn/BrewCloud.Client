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
import { customerlistReportComponent } from '../report/customerlistReport/customerlistReport.component';
// import { DtoPmsRptParameter } from '../../models/DtoPmsRptParameter';
import { customerlistRptParameter } from '../report/models/customerlistRptParameter';
import { formatDate } from '@angular/common';
import { PatientlistDialogComponent } from '../customerdetails/dialogs/patientlist-dialog/patientlist-dialog.component';
import { PayChartComponent } from '../customerdetails/dialogs/pay-chart/pay-chart.component';

@Component({
    selector: 'customerslist',
    templateUrl: './customerlist.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CustomersListComponent implements OnInit {
    displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'phoneNumber2', 'eMail', 'note', 'balance', 'actions'];

    @ViewChild('paginator') paginator: MatPaginator;

    customerlist: customersListDto[] = [];
    dataSource = new MatTableDataSource<customersListDto>(this.customerlist);
    loader = true;
    petCount = 3;
    items = Array(13);

    constructor(private _customerListService: CustomerService,
        private _dialog: MatDialog,
        private _translocoService: TranslocoService,
        private router: Router, private route: ActivatedRoute,
        private customerDetailsService: CustomerDetailsService
    ) { }

    ngOnInit() {
        this.getCustomerList();
    }

    getCustomerList() {
        this._customerListService.getcustomerlist().subscribe((response) => {
            this.customerlist = response.data;
            this.dataSource = new MatTableDataSource<customersListDto>(
                this.customerlist
            );
            // this.dataSource.paginator = this.paginator;
            setTimeout(() => {
                if (this.dataSource) {
                    this.dataSource.paginator = this.paginator;
                }
            }, 0);
            this.loader = false;
        });
    }


    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        const dialog = this._dialog
            .open(CreateEditCustomerAddDialogComponent, {
                maxWidth: '100%',
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
    public redirectToPrint = (id: string) => {
        const pmsrpt1090 = new customerlistRptParameter()
        // pmsrpt1090.cinfrom = formatDate(this.getFormValueByName('cindatefrom'), 'yyyy-MM-dd', 'en-US'),
        // pmsrpt1090.cinto = formatDate(this.getFormValueByName('cindateto'), 'yyyy-MM-dd', 'en-US'),
        // pmsrpt1090.coutfrom = formatDate(this.getFormValueByName('coutdatefrom'), 'yyyy-MM-dd', 'en-US'),
        // pmsrpt1090.coutto = formatDate(this.getFormValueByName('coutdateto'), 'yyyy-MM-dd', 'en-US'),

        pmsrpt1090.resuuid = "00000000-0000-0000-0000-000000000000",

            // pmsrpt1090.hotelidlist = this.hotelRecIdList.substring(0, this.hotelRecIdList.length - 1);
            pmsrpt1090.hotelidlist = 'deneme1';

        // rapora parametreleri backend den döndürmek icin secilen parametrelerin nameleri backend e gönderildi.
        // pmsrpt1090.hotellist = this.pmsHotelListValue != null ? this.pmsHotelListValue.map(x => x.propertyName).toString() : "";
        pmsrpt1090.hotellist = 'deneme2';

        pmsrpt1090.reportId = 1090;
        debugger;
        const dialog = this._dialog.open(customerlistReportComponent, {
            width: '80%',
            disableClose: true,
            data: pmsrpt1090//data
        })
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    redirectToPatientList = (id: string) => {
        const _customer = this.customerlist.find(x => x.id === id);
        if (_customer) {

            const data = {
                customerId: id
            }
            debugger
            const dialog = this._dialog
                .open(PatientlistDialogComponent, {
                    maxWidth: '100%',
                    minWidth: '55%',
                    disableClose: true,
                    data: data,
                })
                .afterClosed()
                .subscribe((response) => {
                    if (response.status) {
                        //this.getCustomerList();
                    }
                });
        }
    }

    openPayChart = (id: string) => {

        const _customer = this.customerlist.find(x => x.id === id);
        if (_customer) {
            const model = {
                customerId: id,
            }
            console.log(model);
            const dialog = this._dialog
                .open(PayChartComponent, {
                    maxWidth: '100vw !important',
                    disableClose: true,
                    data: model
                })
                .afterClosed()
                .subscribe((response) => {
                    if (response.status) {
                        // this.getCustomerList();
                    }
                });
        }



    }




}

