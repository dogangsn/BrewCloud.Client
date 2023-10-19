import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { TranslocoService } from '@ngneat/transloco';
import { UserListDto } from '../models/UserListDto';
import { CreateUserCommand } from '../models/CreateUserCommand';
import { UsersService } from 'app/core/services/settings/users/users.service';
import { RolsService } from 'app/core/services/generalsettings/rols/rols.service';
import { RoleSettingDto } from '../../rolDef/models/RoleSettingDto';

@Component({
    selector: 'app-create-edit-users-dialog',
    styleUrls: ['./create-edit-users.scss'],
    templateUrl: './create-edit-users.html',
})
export class CreateEditUsersDialogComponent implements OnInit {
    selectedusers: UserListDto;
    users: FormGroup;
    isUpdateButtonActive: Boolean;

    rols: RoleSettingDto[] = [];

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        private _usersService: UsersService,
        private _rolsSettings : RolsService,
        @Inject(MAT_DIALOG_DATA) public data: UserListDto
    ) {
        this.selectedusers = data;
    }

    ngOnInit(): void {
        this.getRolsist();
        this.users = this._formBuilder.group({
            active: [true],
            firstLastName: [''],
            email: ['', Validators.required],
            phone: [''],
            appKey : [''],
            roleId : ['',  Validators.required]
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

    addOrUpdateUsers(): void {
        this.selectedusers ? this.updateUsers() : this.addUsers();
    }

    updateUsers(): void {
        const user = new CreateUserCommand();

        this._usersService.addUser(user).subscribe(
            (response) => {
                debugger;

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

    addUsers(): void {
        debugger;
        const user = new CreateUserCommand();
        user.active = this.getFormValueByName('active');
        user.email = this.getFormValueByName('email');
        user.firstName = this.getFormValueByName('firstLastName');
        user.phone = this.getFormValueByName('phone');
        user.appKey = this.getFormValueByName('appKey');
        user.roleId = this.getFormValueByName('roleId');
        user.userName = user.email;

        this._usersService.addUser(user).subscribe(
            (response) => {
                debugger;
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
    
    getRolsist(): void {
        this._rolsSettings.getRolSettings().subscribe((response) => {
            this.rols = response.data;
        });
    }
}
