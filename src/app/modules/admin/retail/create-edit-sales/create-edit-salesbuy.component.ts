import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { SaleBuyListDto } from '../model/SaleBuyListDto';
import { SaleBuyService } from 'app/core/services/ratail/salebuy.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { customersListDto } from '../../customer/models/customersListDto';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { ProductDescriptionsDto } from '../../definition/productdescription/models/ProductDescriptionsDto';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { CreateSaleBuyCommand } from '../model/CreateSaleBuyCommand';
import { suppliersListDto } from '../../suppliers/models/suppliersListDto';
import { SuppliersService } from 'app/core/services/suppliers/suppliers.service';
import { PaymentMethodsDto } from '../../definition/paymentmethods/models/PaymentMethodsDto';
import { PaymentMethodservice } from 'app/core/services/definition/paymentmethods/paymentmethods.service';
import { UpdateSaleBuyCommand } from '../model/UpdateSaleBuyCommand';

@Component({
    selector: 'app-create-edit-salesbuy',
    templateUrl: './create-edit-salesbuy.component.html',
})
export class CreateEditSalesBuyComponent implements OnInit {
    selectedsalebuy: SaleBuyListDto;
    salebuy: FormGroup;
    customerlist: customersListDto[] = [];
    selectedCustomerId: any = '';
    selectedProductId: any = '';
    productdescription: ProductDescriptionsDto[] = [];
    supplierscards: suppliersListDto[] = [];
    payments: PaymentMethodsDto[] = [];

    visibleCustomer: boolean;
    salebuyType: number;
    isSupplier: boolean;
    buttonDisabled = false;
    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        private _salebuyservice: SaleBuyService,
        private _customerListService: CustomerService,
        private _productdescriptionService: ProductDescriptionService,
        private _suppliersService: SuppliersService,
        private _paymentmethodsService: PaymentMethodservice,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.visibleCustomer = data.visibleCustomer;
        this.salebuyType = data.salebuyType;
        this.selectedsalebuy = data.selectedsalebuy;
        this.isSupplier = data.isSupplier;
    }
    ngOnInit() {
        this.getCustomerList();
        this.getProductList();
        this.paymentsList();

        if (this.isSupplier) {
            this.getSuppliers();
        }

        this.salebuy = this._formBuilder.group({
            customerId: ['00000000-0000-0000-0000-000000000000'],
            date: [new Date()],
            productId: [
                '00000000-0000-0000-0000-000000000000',
                Validators.required,
            ],
            remark: [''],
            supplierId: ['00000000-0000-0000-0000-000000000000'],
            invoiceNo: [''],
            paymentType: [1],
            amount: [1],
        });

        this.fillFormData(this.selectedsalebuy);
    }

    fillFormData(selectedSale: SaleBuyListDto) {
        debugger;
        if (this.selectedsalebuy !== null) {
            this.salebuy.setValue({
                date: selectedSale.date,
                invoiceNo: selectedSale.invoiceNo,
                supplierId: selectedSale.supplierName,
                productId : selectedSale.customerName,
                paymentType : selectedSale.paymentName,
                
            });
        }
    }
    

    getCustomerList() {
        this._customerListService.getcustomerlist().subscribe((response) => {
            this.customerlist = response.data;
            console.log(this.customerlist);
        });
    }

    getProductList() {
        this._productdescriptionService
            .GetProductDescriptionList()
            .subscribe((response) => {
                this.productdescription = response.data;
            });
    }

    getSuppliers() {
        this._suppliersService.getSuppliersList().subscribe((response) => {
            this.supplierscards = response.data;
            console.log(this.supplierscards);
        });
    }

    paymentsList() {
        this._paymentmethodsService
            .getPaymentMethodsList()
            .subscribe((response) => {
                this.payments = response.data;
                console.log(this.payments);
            });
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    filterCustomerId(value: any): void {
        this.selectedCustomerId = value;
    }

    filterProductId(value: any): void {
        this.selectedProductId = value;
    }

    getFormValueByName(formName: string): any {
        return this.salebuy.get(formName).value;
    }

    addOrUpdateSaleBuy(): void {
        this.buttonDisabled = true;
        this.selectedsalebuy ? this.updateBuySale() : this.addBuySale();
    }

    addBuySale(): void {
        if (this.salebuy.valid) {
            const _amount = this.getFormValueByName('amount');
            if (_amount == 0) {
                this.showSweetAlert(
                    'error',
                    'Miktar Bilgisi 0(sıfır) büyük olmalıdır.'
                );
            }

            const saleBuyItem = new CreateSaleBuyCommand(
                this.getFormValueByName('customerId'),
                this.getFormValueByName('date'),
                this.getFormValueByName('productId'),
                this.getFormValueByName('remark'),
                this.salebuyType,
                this.getFormValueByName('supplierId'),
                this.getFormValueByName('invoiceNo'),
                this.getFormValueByName('paymentType'),
                this.getFormValueByName('amount')
            );

            this._salebuyservice.createSaleBuy(saleBuyItem).subscribe(
                (response) => {
                    debugger;

                    if (response.isSuccessful) {
                        this.showSweetAlert('success', 'sweetalert.success');
                        this._dialogRef.close({
                            status: true,
                        });
                    } else {
                        this.showSweetAlert('error', 'sweetalert.error');
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        } else {
            if (!this.salebuy.get('productId').value) {
                this.showSweetAlert('error', 'Ürün Seçimi Yapınız.');
            }
        }
    }

    updateBuySale(): void {
        if (this.salebuy.valid) {
            const _amount = this.getFormValueByName('amount');
            if (_amount == 0) {
                this.showSweetAlert(
                    'error',
                    'Miktar Bilgisi 0(sıfır) büyük olmalıdır.'
                );
            }

            const saleBuyItem = new UpdateSaleBuyCommand(
                this.selectedsalebuy.id,
                this.getFormValueByName('customerId'),
                this.getFormValueByName('date'),
                this.getFormValueByName('productId'),
                this.getFormValueByName('remark'),
                this.salebuyType,
                this.getFormValueByName('supplierId'),
                this.getFormValueByName('invoiceNo'),
                this.getFormValueByName('paymentType'),
                this.getFormValueByName('amount')
            );

            this._salebuyservice.updateSaleBuy(saleBuyItem).subscribe(
                (response) => {
                    debugger;

                    if (response.isSuccessful) {
                        this.showSweetAlert('success', 'sweetalert.success');
                        this._dialogRef.close({
                            status: true,
                        });
                    } else {
                        this.showSweetAlert('error', 'sweetalert.error');
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        } else {
            if (!this.salebuy.get('productId').value) {
                this.showSweetAlert('error', 'Ürün Seçimi Yapınız.');
            }
        }
    }

    showSweetAlert(type: string, message: string): void {
        if (type === 'success') {
            const sweetAlertDto = new SweetAlertDto(
                this.translate(message),
                this.translate('sweetalert.transactionSuccessful'),
                SweetalertType.success
            );
            GeneralService.sweetAlert(sweetAlertDto);
        } else {
            const sweetAlertDto = new SweetAlertDto(
                this.translate(message),
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
