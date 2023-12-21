import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';

@Component({
    selector: 'app-get-collection-editdialog',
    templateUrl: './get-collection-editdialog.component.html',
    styleUrls: ['./get-collection-editdialog.component.css'],
})
export class GetColectionEditDialogComponent implements OnInit {

    selectedgetcollection : any;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
    ) {}

    ngOnInit(): void {
        
    }

    // getFormValueByName(formName: string): any {
    //     return this.salebuy.get(formName).value;
    // }

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