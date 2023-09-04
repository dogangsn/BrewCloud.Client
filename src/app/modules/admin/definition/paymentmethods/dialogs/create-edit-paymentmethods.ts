import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentMethodsDto } from '../models/PaymentMethodsDto';
import { PaymentMethodservice } from 'app/core/services/definition/paymentmethods/paymentmethods.service';

@Component({
    selector: 'app-create-edit-paymentmethods-dialog',
    styleUrls: ['./create-edit-paymentmethods.scss'],
    templateUrl: './create-edit-paymentmethods.html',
})
export class CreateEditPaymentMethodsDialogComponent implements OnInit {
    selectedPaymentMethods: PaymentMethodsDto;
    paymentmethods: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _paymentmethodsService : PaymentMethodservice,
        private _translocoService: TranslocoService
    ) {}

    ngOnInit(): void {
        this.paymentmethods = this._formBuilder.group({
            name: [''],
            remark: ['']
        });

        this.fillFormData(this.selectedPaymentMethods);
    }

    fillFormData(selectedPaymentMethod: PaymentMethodsDto) {
        debugger;
        if (this.selectedPaymentMethods !== null) {
            this.paymentmethods.setValue({
                name: selectedPaymentMethod.name,
                remark: selectedPaymentMethod.name,
            });
        }
    }

    addOrUpdateUnitDef(): void {
        this.selectedPaymentMethods
            ? this.updateunitdefinition()
            : this.addunitdefinition();
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addunitdefinition(): void {
        // const unitsItem = new CreatePaymentMethodsCommand( 
        //     this.getFormValueByName('unitCode'),
        //     this.getFormValueByName('unitName')
        // );

        // this._paymentmethodsService.createUnits(unitsItem).subscribe(
        //     (response) => {
        //         if (response.isSuccessful) {
        //             this.showSweetAlert('success');
        //             this._dialogRef.close({
        //                 status: true,
        //             });
        //         } else {
        //             this.showSweetAlert('error');
        //         }
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );
    }

    updateunitdefinition(): void{
        // const unitItem = new UpdateUnitsCommand(
        //     this.selectedunitdefinition.id,
        //     this.getFormValueByName('unitCode'),
        //     this.getFormValueByName('unitName'),
        // );

        // this._paymentmethodsService.updateUnits(unitItem).subscribe(
        //     (response) => {
        //         debugger;

        //         if (response.isSuccessful) {
        //             this.showSweetAlert('success');
        //             this._dialogRef.close({
        //                 status: true,
        //             });
        //         } else {
        //             this.showSweetAlert('error');
        //         }
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );
    }

    getFormValueByName(formName: string): any {
        return this.paymentmethods.get(formName).value;
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
