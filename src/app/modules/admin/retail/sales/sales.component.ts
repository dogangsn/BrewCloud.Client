import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SaleBuyListDto } from '../model/SaleBuyListDto';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';
import { CreateEditSalesBuyComponent } from '../create-edit-sales/create-edit-salesbuy.component';
import { SaleBuyService } from 'app/core/services/ratail/salebuy.service';

@Component({
    selector: 'sales',
    templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'invoiceNo',
        'customerName',
        'paymentName',
        'netPrice',
        'kdv',
        'discount',
        'total',
        'actions',
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    salebuyList: SaleBuyListDto[] = [];
    dataSource = new MatTableDataSource<SaleBuyListDto>(this.salebuyList);
    isUpdateButtonActive: boolean;

    constructor(
        private _dialog: MatDialog,
        private _translocoService: TranslocoService,
        private _salebuyservice: SaleBuyService,
    ) {}

    ngOnInit() {
        this.getSaleBuy();
    }

    getSaleBuy() : void {

        const model = {
            type : 1
        };
        this._salebuyservice.getBuySaleList(model).subscribe((response) => {
            this.salebuyList = response.data;
            console.log(this.salebuyList);
        });
    }

    createsales(): void {
        const model = {
            selectedsalebuy : null,
            visibleCustomer : false,
            salebuyType : 1, //satis
            isSupplier : false
        }


        const dialog = this._dialog
            .open(CreateEditSalesBuyComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                
                data: model,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    //this.getStoreList();
                }
            });
    }

    createCustomerSales(): void {
        const model = {
            selectedsalebuy : null,
            visibleCustomer : true,
            salebuyType : 1, //satis
            isSupplier : false
        }

        const dialog = this._dialog
            .open(CreateEditSalesBuyComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: model,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    //this.getStoreList();
                }
            });

    }

    public redirectToUpdate = (id: string) => {
        this.isUpdateButtonActive = true;
        // const selectedStore = this.storeList.find((store) => store.id === id);
        // if (selectedStore) {
        //     const dialogRef = this._dialog.open(
        //         CreateEditStoreDialogComponent,
        //         {
        //             maxWidth: '100vw !important',
        //             disableClose: true,
        //             data: selectedStore
        //         }
        //     );

        //     dialogRef.afterClosed().subscribe((response) => {
        //         if (response.status) {
        //             this.getStoreList();
        //         }
        //     });
        // }
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
                    // this._storeservice
                    //     .deletedStores(model)
                    //     .subscribe((response) => {
                    //         if (response.isSuccessful) {
                    //             this.getStoreList();
                    //             const sweetAlertDto2 = new SweetAlertDto(
                    //                 this.translate('sweetalert.success'),
                    //                 this.translate('sweetalert.transactionSuccessful'),
                    //                 SweetalertType.success
                    //             );
                    //             GeneralService.sweetAlert(sweetAlertDto2);
                    //         } else {
                    //             console.error('Silme işlemi başarısız.');
                    //         }
                    //     });
                }
            }
        );
    };

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
