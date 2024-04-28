import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';
import { VaccineListDto } from '../models/vaccineListDto';
import { VetVetAnimalsTypeListDto } from 'app/modules/admin/customer/models/VetVetAnimalsTypeListDto';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { VaccineMedicine } from '../models/VaccineMedicine';

@Component({
    selector: 'app-create-edit-vaccine-dialog',
    styleUrls: ['./create-edit-vaccine.scss'],
    templateUrl: './create-edit-vaccine.html',
})
export class CreateEditVaccineDialogComponent implements OnInit {
    selectedvaccine: VaccineListDto;
    vaccine: FormGroup;
    buttonDisabled = false;
    panelOpenState = true;


    vaccineMedicine : VaccineMedicine[] = [];


    animalTypesList: VetVetAnimalsTypeListDto[] = [];

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder, 
        private _translocoService: TranslocoService,
        private _customerService: CustomerService,
        @Inject(MAT_DIALOG_DATA) public data: VaccineListDto
    ) {
        this.selectedvaccine = data;
    }

    ngOnInit(): void {
        this.vaccine = this._formBuilder.group({
        
        });

        this.fillFormData(this.selectedvaccine);
    }

    fillFormData(selectedUnitdef: VaccineListDto) {
        debugger;
        if (this.selectedvaccine !== null) {
            this.vaccine.setValue({
            
            });
        }
    }

    getAnimalTypesList() {
        this._customerService.getVetVetAnimalsType().subscribe((response) => {
            this.animalTypesList = response.data;
            console.log('anımals', this.animalTypesList);
        });
    }

    addOrUpdate(): void {
        this.buttonDisabled = true;
        this.selectedvaccine
            ? this.updateVaccine()
            : this.addVaccine();
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addVaccine(): void {
        // const unitsItem = new CreateUnitsCommand( 
        //     this.getFormValueByName('unitCode'),
        //     this.getFormValueByName('unitName')
        // );

        // this._unitservice.createUnits(unitsItem).subscribe(
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

    updateVaccine(): void{
        // const unitItem = new UpdateUnitsCommand(
        //     this.selectedunitdefinition.id,
        //     this.getFormValueByName('unitCode'),
        //     this.getFormValueByName('unitName'),
        // );

        // this._unitservice.updateUnits(unitItem).subscribe(
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
        return this.vaccine.get(formName).value;
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
