import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unitdefinitionListDto } from '../models/unitdefinitionListDto';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';
import { CreateUnitsCommand } from '../models/CreateUnitsCommand';

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
        private _formBuilder: FormBuilder,
        private _unitservice : UnitsService
    ) {}

    ngOnInit(): void {
        this.unitdefinition = this._formBuilder.group({
            unitCode: [''],
            unitName: ['']
        });
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addunitdefinition(): void {
        const unitsItem = new CreateUnitsCommand( 
            this.getFormValueByName('unitCode'),
            this.getFormValueByName('unitName')
        );

        this._unitservice.createUnits(unitsItem).subscribe(
            (response) => {
                if (response.isSuccessful) {
                    // this.showSweetAlert('success');
                    this._dialogRef.close({
                        status: true,
                    });
                } else {
                    // this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getFormValueByName(formName: string): any {
        return this.unitdefinition.get(formName).value;
    }
}
