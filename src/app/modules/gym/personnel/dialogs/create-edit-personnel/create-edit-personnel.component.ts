import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PersonnelDto } from '../../models/PersonnelDto';
import { PersonnelService } from 'app/core/services/gympersonnel/personnel.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { BranchService } from 'app/core/services/generalsettings/branch/branch.service';
import { BranchDto } from 'app/modules/admin/generalsettings/branch/models/BranchDto';

@Component({
  selector: 'app-create-edit-personnel',
  templateUrl: './create-edit-personnel.component.html',
  styleUrls: ['./create-edit-personnel.component.css']
})
export class CreateEditPersonnelComponent implements OnInit {
  personnelForm: FormGroup;
  selectedPersonnel: PersonnelDto = new PersonnelDto();
  isUpdate: boolean;
  branchList: BranchDto[] = [];
  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService,
    private personnelService: PersonnelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private branchService: BranchService,
  ) {
    if (data) {
      this.isUpdate = true;
      this.selectedPersonnel = data;
    }
  }

  ngOnInit() {
    this.getBranchList();
    this.personnelForm = this._formBuilder.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      phoneNumber2: [''],
      email: [''],
      identityNumber: [''],
      graduate: [''],
      address: [''],
      imageId: [''],
      branchId: ['', Validators.required],
    });
    if (this.isUpdate) {
      this.fillFormData(this.selectedPersonnel);
    }
  }

  addOrUpdate(): void {
    const model = new PersonnelDto();
    model.id = this.selectedPersonnel.id;
    model.name = this.getFormValueByName("name");
    model.surName = this.getFormValueByName("surName");
    model.phoneNumber = this.getFormValueByName("phoneNumber");
    model.phoneNumber2 = this.getFormValueByName("phoneNumber2");
    model.email = this.getFormValueByName("email");
    model.identityNumber = this.getFormValueByName("identityNumber");
    model.graduate = this.getFormValueByName("graduate");
    model.address = this.getFormValueByName("address");
    model.imageId = this.getFormValueByName("imageId");
    model.branchId = this.getFormValueByName("branchId");
    this.isUpdate ? this.update(model) : this.add(model);
  }

  add(model: PersonnelDto): void {
    this.personnelService.createGymPersonnel(model).subscribe(
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

  update(model: PersonnelDto): void {
    this.personnelService.updateGymPersonnel(model).subscribe(
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
    return this.personnelForm.get(formName).value;
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

  fillFormData(selectedPersonnel: PersonnelDto) {
    if (selectedPersonnel) {
      const personnelData = selectedPersonnel;
      this.personnelForm.patchValue({
        name: personnelData.name,
        surName: personnelData.surName,
        phoneNumber: personnelData.phoneNumber,
        phoneNumber2: personnelData.phoneNumber2,
        email: personnelData.email,
        identityNumber: personnelData.identityNumber,
        graduate: personnelData.graduate,
        address: personnelData.address,
        imageId: personnelData.imageId,
        branchId: personnelData.branchId,
      });
    }
  }

  formatPhoneNumber(inputValue: string, formControlName: string): void {
    const numericValue = inputValue.replace(/\D/g, '');

    let formattedValue = '';
    if (numericValue.length > 0) {
      formattedValue += '(' + numericValue.substring(0, 3) + ')';
    }
    if (numericValue.length > 3) {
      formattedValue += ' ' + numericValue.substring(3, 6);
    }
    if (numericValue.length > 6) {
      formattedValue += '-' + numericValue.substring(6, 10);
    }

    this.personnelForm.get(formControlName).setValue(formattedValue);
  }

  getBranchList(): void {
    this.branchService.getBranchList().subscribe((response) => {
      if (response.isSuccessful) {
        if (response.data) {
          this.branchList = response.data;
          this.personnelForm.get('branchId').setValue(this.branchList[0].id);
        }
      }
    });
  }

  validateNumberInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const isNumberKey = /^[0-9]$/.test(event.key);

    if (!isNumberKey && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

}
