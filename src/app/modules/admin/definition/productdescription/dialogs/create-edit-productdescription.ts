import { Component, OnInit } from '@angular/core';
import { ProductDescriptionsDto } from '../models/ProductDescriptionsDto';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-create-edit-productdescription-dialog',
    templateUrl: './create-edit-productdescription.html',
})
export class CreateEditProductDescriptionDialogComponent implements OnInit {

  selectedProductdescription: ProductDescriptionsDto;

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    constructor(
      private _dialogRef: MatDialogRef<any>,
    ){

    }



    closeDialog(): void {
      this._dialogRef.close({ status: null });
    }

}
