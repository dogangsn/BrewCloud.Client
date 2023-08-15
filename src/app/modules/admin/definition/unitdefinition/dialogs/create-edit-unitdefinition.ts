import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { unitdefinitionListDto } from '../models/unitdefinitionListDto';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';
import { CreateUnitsCommand } from '../models/CreateUnitsCommand';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';

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
        private _unitservice : UnitsService,
        private _translocoService: TranslocoService
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
                    this.showSweetAlert('success');
                    this._dialogRef.close({
                        status: true,
                    });
                } else {
                    this.showSweetAlert('error');
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
