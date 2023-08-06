import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductCategoriesListDto } from '../models/ProductCategoriesListDto';

@Component({
    selector: 'app-create-edit-productcategory-dialog',
    styleUrls: ['./create-edit-productcategory.scss'],
    templateUrl: './create-edit-productcategory.html',
})
export class CreateEditProductCategoriesDialogComponent implements OnInit {
    selectedproductcategory: ProductCategoriesListDto;
    productcategory: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        throw new Error('Method not implemented.');
        this.productcategory = this._formBuilder.group({
            name: [''],
            categoryCode: ['']
        });
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addproductcategories(): void {
        
    }
}
