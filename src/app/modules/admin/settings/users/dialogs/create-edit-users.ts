import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { TranslocoService } from '@ngneat/transloco';
import { UserListDto } from '../models/UserListDto';

@Component({
    selector: 'app-create-edit-users-dialog',
    styleUrls: ['./create-edit-users.scss'],
    templateUrl: './create-edit-users.html',
})
export class CreateEditUsersDialogComponent implements OnInit {

    selectedusers: UserListDto;
    users: FormGroup;
    isUpdateButtonActive: Boolean;


    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: UserListDto
    ) {
        this.selectedusers = data;
    }

    ngOnInit(): void {

        this.users = this._formBuilder.group({
            email: ['', Validators.required],
        });
        this.fillFormData(this.selectedusers);
    }
    fillFormData(selectedSuppliers: UserListDto) {
        debugger;
        if (this.selectedusers !== null) {
            this.users.setValue({
                email: selectedSuppliers.email,
            });
        }
    }
    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }
    addOrUpdateStore(): void {
        this.selectedusers
            ? this.updateSupplier()
            : this.addsuppliers();
    }
    updateSupplier(): void {
        // const supItem = new UpdateSuppliersCommand(
        //     this.selectedusers.id,
        //     this.getFormValueByName('suppliername'),
        //     this.getFormValueByName('email'),
        //     this.getFormValueByName('phone'),
        //     this.getFormValueByName('active')
        // );

        // this._Suppliers.updateSuppliers(supItem).subscribe(
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
    addsuppliers(): void {

        
        // const suppliersItem = new CreateSuppliersCommand( 
        //     this.getFormValueByName('suppliername'),
        //     this.getFormValueByName('email'),
        //     this.getFormValueByName('phone'),
        //     this.getFormValueByName('active')

        //     );
        //     debugger;
        //     this._Suppliers.createSuppliers(suppliersItem).subscribe(
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
        return this.users.get(formName).value;
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
