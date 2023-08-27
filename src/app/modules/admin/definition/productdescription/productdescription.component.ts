import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditProductDescriptionDialogComponent } from './dialogs/create-edit-productdescription';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDescriptionsDto } from './models/ProductDescriptionsDto';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-productdescription',
    templateUrl: './productdescription.component.html',
    styleUrls: ['./productdescription.component.css'],
})
export class ProductdescriptionComponent implements OnInit {
    displayedColumns: string[] = [
        'name',
        'productCode',
        'productBarcode',
        'buyingPrice',
        'sellingPrice',
        'actions'
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    productdescription: ProductDescriptionsDto[] = [];
    dataSource = new MatTableDataSource<ProductDescriptionsDto>(
        this.productdescription
    );
    isUpdateButtonActive: boolean;
    

    constructor(
        private _dialog: MatDialog,
        private _productdescriptionService: ProductDescriptionService,
        private _translocoService: TranslocoService) {

        }

    ngOnInit() {
        this.getProductList();
    }

    getProductList() {
        this._productdescriptionService
            .GetProductDescriptionList()
            .subscribe((response) => {
                this.productdescription = response.data;
                console.log(this.productdescription);
            });
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        //this.isUpdateButtonActive = false;

        const dialog = this._dialog
            .open(CreateEditProductDescriptionDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    //this.getErpFinanceMonitors();
                }
            });
    }

    public redirectToUpdate = (id: string) => {
        this.isUpdateButtonActive = true;
        const selectedProduct = this.productdescription.find((product) => product.id === id);
        if (selectedProduct) {
            const dialogRef = this._dialog.open(
                CreateEditProductDescriptionDialogComponent,
                {
                    maxWidth: '100vw !important',
                    disableClose: true,
                    data: selectedProduct,
                }
            );

            dialogRef.afterClosed().subscribe((response) => {
                if (response.status) {
                    this.getProductList();
                }
            });
        }
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
                    this._productdescriptionService
                        .deleteProductDescription(model)
                        .subscribe((response) => {
                            if (response.isSuccessful) {
                                this.getProductList();
                                const sweetAlertDto2 = new SweetAlertDto(
                                    this.translate('sweetalert.success'),
                                    this.translate(
                                        'sweetalert.transactionSuccessful'
                                    ),
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
