import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { SaleBuyListDto } from '../model/SaleBuyListDto';
import { SaleBuyService } from 'app/core/services/ratail/salebuy.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { customersListDto } from '../../customer/customerlist/models/customersListDto';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { ProductDescriptionsDto } from '../../definition/productdescription/models/ProductDescriptionsDto';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';

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

    visibleCustomer:boolean;
    salebuyType : number;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        private _salebuyservice: SaleBuyService,
        private _customerListService: CustomerService,
        private _productdescriptionService: ProductDescriptionService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.visibleCustomer = data.visibleCustomer;
        this.salebuyType = data.salebuyType;
        this.selectedsalebuy = data.selectedsalebuy;
    }
    ngOnInit() {

        this.getCustomerList();
        this.getProductList();

        this.salebuy = this._formBuilder.group({
            customerId: ['00000000-0000-0000-0000-000000000000'],
            date: [''],
            productId: ['00000000-0000-0000-0000-000000000000'],
            remark : ['']
        });

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

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    filterCustomerId(value: any): void {
        this.selectedCustomerId = value;
    }

    filterProductId(value: any): void {
        this.selectedCustomerId = value;
    }

    getFormValueByName(formName: string): any {
        return this.salebuy.get(formName).value;
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
