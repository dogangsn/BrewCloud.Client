import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { TranslocoService } from '@ngneat/transloco';
import { demandProductsListDto } from '../models/demandProductsListDto';
import { CreateDemandProductsCommand } from '../models/CreateDemandProductsCommand';
import { DemandProductsService } from 'app/core/services/Demands/DemandProducts/demandproducts.service'; 
import { UpdateDemandProductsCommand } from '../models/UpdateDemandProductsCommand'; 

@Component({
    selector: 'app-create-edit-casingdefinition-dialog',
    styleUrls: ['./create-edit-casingdefinition.scss'],
    templateUrl: './create-edit-casingdefinition.html',
})
export class CreateEditCasingDefinitionDialogComponent implements OnInit {
    selectedcasingdefinition: demandProductsListDto;
    casingDefinition: FormGroup;
    isUpdateButtonActive: Boolean;


    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _CasingDefinition: DemandProductsService,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: demandProductsListDto
    ) {
        this.selectedcasingdefinition = data;
    }

    ngOnInit(): void {
        this.casingDefinition = this._formBuilder.group({
            casename: ['', Validators.required],
            active: [true]
        });
        this.fillFormData(this.selectedcasingdefinition);

    }
    fillFormData(selectedCase: demandProductsListDto) {
        debugger;
        // if (this.selectedcasingdefinition !== null) {
        //     this.casingDefinition.setValue({
        //         casename: selectedCase.casename,
        //         active: selectedCase.active,
        //     });
        // }
    }
    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }
    addOrUpdateStore(): void {
        this.selectedcasingdefinition
            ? this.updateCase()
            : this.addcasingDefinitions();
    }
        updateCase(): void {
        // const caseItem = new UpdateCasingDefinitionCommand(
        //     this.selectedcasingdefinition.id,
        //     this.getFormValueByName('casename'),
        //     this.getFormValueByName('active')
        // );

        // this._CasingDefinition.updateCasingDefinition(caseItem).subscribe(
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
    addcasingDefinitions(): void {

         
        debugger;
        // const casedefinitionItem = new CreateCasingDefinitionCommand( 
        //     this.getFormValueByName('casename'),
        //     this.getFormValueByName('active')
        //     );
            
        //     this._CasingDefinition.createCasingDefinition(casedefinitionItem).subscribe(
        //         (response) => {
                    
        //             debugger;

        //         if (response.isSuccessful) {
        //             this.showSweetAlert('success');
        //             this._dialogRef.close({
        //                 status: true,
        //             });
        //         } else {
        //              this.showSweetAlert('error');
        //         }
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );

    }

    getFormValueByName(formName: string): any {
        return this.casingDefinition.get(formName).value;
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
