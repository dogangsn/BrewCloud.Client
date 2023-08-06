import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unitdefinitionListDto } from '../models/unitdefinitionListDto';

@Component({
    selector: 'app-create-edit-unitdefinition-dialog',
    styleUrls: ['./create-edit-unitdefinition.scss'],
    templateUrl: './create-edit-unitdefinition.html',
})
export class CreateEditUnitDefinitionDialogComponent implements OnInit {
    selectedunitdefinition: unitdefinitionListDto;
    unitdefinition: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        throw new Error('Method not implemented.');
        this.unitdefinition = this._formBuilder.group({
            name: [''],
            categoryCode: ['']
        });
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addunitdefinition(): void {
        
    }
}
