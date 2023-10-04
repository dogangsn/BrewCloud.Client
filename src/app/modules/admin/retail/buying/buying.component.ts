import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SaleBuyListDto } from '../model/SaleBuyListDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { CreateEditSalesBuyComponent } from '../create-edit-sales/create-edit-salesbuy.component';
import { SaleBuyService } from 'app/core/services/ratail/salebuy.service';

@Component({
    selector: 'buying',
    templateUrl: './buying.component.html',
})
export class BuyingComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'invoiceNo',
        'supplierName',
        'payment',
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
            type : 2
        };
        this._salebuyservice.getBuySaleList(model).subscribe((response) => {
            this.salebuyList = response.data;
            console.log(this.salebuyList);
        });
    }

    createsales(): void {
        const model = {
            selectedsalebuy: null,
            visibleCustomer: false,
            salebuyType: 2, //satis
            isSupplier: true,
        };

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

    createSupplierSales(): void {
        const model = {
            selectedsalebuy: null,
            visibleCustomer: false,
            salebuyType: 2, //satis
            isSupplier: true,
        };

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
