import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { PersonnelService } from 'app/core/services/gympersonnel/personnel.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { PersonnelPermissionDto } from '../../../models/PersonnelPermissionDto';
import { PersonnelDto } from '../../../models/PersonnelDto';
import { PermissionTypes } from 'app/modules/gym/common/enums/PermissionTypes.enum';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-edit-personnel-permission',
  templateUrl: './create-edit-personnel-permission.component.html',
  styleUrls: ['./create-edit-personnel-permission.component.css']
})
export class CreateEditPersonnelPermissionComponent implements OnInit {
  personnelPermissionForm: FormGroup;
  selectedPersonnelPermission: PersonnelPermissionDto = new PersonnelPermissionDto();
  isUpdate: boolean;
  personnelList: PersonnelDto[] = [];
  personnelPermissionList: { name: string; id: number }[] = [];

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService,
    private personnelService: PersonnelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.isUpdate = true;
      this.selectedPersonnelPermission = data;
    }
  }

  ngOnInit() {
    this.getPersonnelListLight();
    this.personnelPermissionForm = this._formBuilder.group({
      personnelId: ['', Validators.required],
      isApproved: [true],
      permissionType: [''],
      beginDate: [''],
      endDate: [''],
      note: ['']
    });

    for (const n in PermissionTypes) {
      if (typeof PermissionTypes[n] === 'number') {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        this.personnelPermissionList.push({ id: <any>PermissionTypes[n], name: n });
      }
    }
    if (this.isUpdate) {
      this.fillFormData(this.selectedPersonnelPermission);
    }
  }

  addOrUpdate(): void {
    const model = new PersonnelPermissionDto();
    model.id = this.selectedPersonnelPermission.id;
    model.isApproved = this.getFormValueByName("isApproved");
    model.personnelId = this.getFormValueByName("personnelId");
    model.permissionType = this.getFormValueByName("permissionType");
    model.beginDate = formatDate(this.getFormValueByName('beginDate'), 'yyyy-MM-dd', 'en-US');
    model.endDate = formatDate(this.getFormValueByName('endDate'), 'yyyy-MM-dd', 'en-US');
    model.note = this.getFormValueByName("note");
    this.isUpdate ? this.update(model) : this.add(model);
  }

  add(model: PersonnelPermissionDto): void {
    this.personnelService.createGymPersonnelPermission(model).subscribe(
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

  update(model: PersonnelPermissionDto): void {
    this.personnelService.updateGymPersonnelPermission(model).subscribe(
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

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  getFormValueByName(formName: string): any {
    return this.personnelPermissionForm.get(formName).value;
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

  fillFormData(selectedPersonnel: PersonnelPermissionDto) {
    if (selectedPersonnel) {
      const personnelData = selectedPersonnel;
      this.personnelPermissionForm.patchValue({
        isApproved: personnelData.isApproved,
        personnelId: personnelData.personnelId,
        permissionType: personnelData.permissionType,
        beginDate: personnelData.beginDate,
        endDate: personnelData.endDate,
        note: personnelData.note
      });
    }
  }

  getPersonnelListLight(): void {
    this.personnelService.getPersonnelListLight().subscribe((response) => {
      if (response.isSuccessful) {
        if (response.data) {
          this.personnelList = response.data;
        }
      }
    });
  }

}
