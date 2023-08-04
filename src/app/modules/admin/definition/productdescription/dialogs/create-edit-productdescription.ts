import { Component, OnInit } from '@angular/core';
import { ProductDescriptionsDto } from '../models/ProductDescriptionsDto';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-create-edit-productdescription-dialog',
    styleUrls: ['./create-edit-productdescription.scss'],
    templateUrl: './create-edit-productdescription.html',
})
export class CreateEditProductDescriptionDialogComponent implements OnInit {
    selectedProductdescription: ProductDescriptionsDto;

    productdescription: FormGroup;

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    constructor(private _dialogRef: MatDialogRef<any>) {}

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }
}
