import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { SaleBuyListDto } from '../model/SaleBuyListDto';

@Component({
    selector: 'app-create-edit-salesbuy',
    templateUrl: './create-edit-salesbuy.component.html',
})
export class CreateEditSalesBuyComponent implements OnInit {
    selectedsalebuy: SaleBuyListDto;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: SaleBuyListDto
    ) {}

    ngOnInit() {}

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }
}
