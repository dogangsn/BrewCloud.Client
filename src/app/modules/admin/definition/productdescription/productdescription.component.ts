import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class ProductdescriptionComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'name',
        'productCode',
        'productBarcode',
        'buyingPrice',
        'sellingPrice',
        'actions',
    ];

    @ViewChild('paginator') paginator: MatPaginator;

    productdescription: ProductDescriptionsDto[] = [];
    dataSource = new MatTableDataSource<ProductDescriptionsDto>(
        this.productdescription
    );
    isUpdateButtonActive: boolean;
    visibleProductType: boolean;
    producttype: number;

    constructor(
        private _dialog: MatDialog,
        private _productdescriptionService: ProductDescriptionService,
        private _translocoService: TranslocoService
    ) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.getProductList();
    }

    getProductList() {
        const model = {
            ProductType: 1,
        };
        this._productdescriptionService
            .getProductDescriptionFilters(model)
            .subscribe((response) => {
                this.productdescription = response.data;
                console.log(this.productdescription);

                this.dataSource = new MatTableDataSource<ProductDescriptionsDto>(this.productdescription);
    
                this.dataSource.paginator = this.paginator;
            });
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        this.isUpdateButtonActive = false;
        this.visibleProductType = false;
        this.producttype = 1;

        const model = {
            selectedProductdescription: null,
            producttype: 1,
            visibleProductType: false,
        };

        const dialog = this._dialog
            .open(CreateEditProductDescriptionDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: model,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    this.getProductList();
                }
            });
    }

    public redirectToUpdate = (id: string) => {
        this.isUpdateButtonActive = true;
        this.visibleProductType = false;
        this.producttype = 1;

        const selectedProduct = this.productdescription.find(
            (product) => product.id === id
        );
        const model = {
            selectedProductdescription: selectedProduct,
            producttype: 1,
            visibleProductType: false,
        };
        if (selectedProduct) {
            const dialogRef = this._dialog.open(
                CreateEditProductDescriptionDialogComponent,
                {
                    maxWidth: '100vw !important',
                    disableClose: true,
                    data: model,
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
                                this.showSweetAlert(
                                    'error',
                                    response.errors[0]
                                );
                                console.log(response.errors[0]);
                            }
                        });
                }
            }
        );
    };

    showSweetAlert(type: string, message: string): void {
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
                this.translate(message),
                SweetalertType.error
            );
            GeneralService.sweetAlert(sweetAlertDto);
        }
    }

    translate(key: string): any {
        return this._translocoService.translate(key);
    }
}
