import { Component, OnInit } from '@angular/core';
import { ProductDescriptionsDto } from '../models/ProductDescriptionsDto';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-create-edit-productdescription-dialog',
    styleUrls: ['./create-edit-productdescription.scss'],
    templateUrl: './create-edit-productdescription.html',
})
export class CreateEditProductDescriptionDialogComponent implements OnInit {
    selectedProductdescription: ProductDescriptionsDto;
    productdescription: FormGroup;


    constructor(
        private _dialogRef: MatDialogRef<any>,  
        private _formBuilder: FormBuilder) 
        {

        }

        
    ngOnInit(): void {
        throw new Error('Method not implemented.');


        this.productdescription = this._formBuilder.group({
            name: [''],
        });

    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }
}
