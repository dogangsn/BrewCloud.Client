import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentMethodservice } from 'app/core/services/definition/paymentmethods/paymentmethods.service';
import { GeneralService } from 'app/core/services/general/general.service';
import { PaymentMethodsDto } from 'app/modules/admin/definition/paymentmethods/models/PaymentMethodsDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { PaymentTransactionListDto } from './model/PaymentTransactionListDto';
import { CustomerService } from 'app/core/services/customers/customers.service';

@Component({
    selector: 'app-get-collection-editdialog',
    templateUrl: './get-collection-editdialog.component.html',
    styleUrls: ['./get-collection-editdialog.component.css'],
})
export class GetColectionEditDialogComponent implements OnInit {

    selectedgetcollection : any;
    getcollection: FormGroup;
    buttonDisabled = false;

    payments: PaymentMethodsDto[] = [];
    selectedCustomerId: any;
    paymentTransaction : PaymentTransactionListDto[] = [];

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        private _paymentmethodsService: PaymentMethodservice,
        private _customerService: CustomerService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.selectedCustomerId = data;
    }

    ngOnInit(): void {
        this.paymentsList();
        this.getPaymentTransactiopnList();

        this.getcollection = this._formBuilder.group({
            collectionId : ['', Validators.required],
            paymenttype: ['', Validators.required]
        });

    }

    // getFormValueByName(formName: string): any {
    //     return this.salebuy.get(formName).value;
    // }

    paymentsList() {
        this._paymentmethodsService
            .getPaymentMethodsList()
            .subscribe((response) => {
                this.payments = response.data;
                console.log(this.payments);

            });
    }

    getPaymentTransactiopnList(){

        const model = {
            CustomerId :  this.selectedCustomerId.customerId
        }

        this._customerService
        .getPaymentTransactionList(model)
        .subscribe((response) => {
            this.paymentTransaction = response.data;
            console.log(this.paymentTransaction);

        });
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

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

}