import { Component, ElementRef, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { CustomerService } from 'app/core/services/customers/customers.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerGroupListDto } from 'app/modules/admin/definition/customergroup/models/customerGroupListDto';
import { CustomerGroupService } from 'app/core/services/definition/customergroup/customergroup.service';
import { CustomerDetailDto } from '../../../models/CustomerDetailDto';

@Component({
  selector: 'app-customer-detail-edit-dialog',
  templateUrl: './customer-detail-edit-dialog.component.html',
  styleUrls: ['./customer-detail-edit-dialog.component.css']
})
export class CustomerDetailEditDialogComponent implements OnInit {
  customerEditForm: FormGroup;
  updateCustomerDetailDto: CustomerDetailDto;

  customergroupList: CustomerGroupListDto[] = [];
  selectedValue: string;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _translocoService: TranslocoService,
    private _customergroup: CustomerGroupService,
    
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {

    this.getCustomerGroupList();
    this.customerEditForm = this._formBuilder.group({
      email: [''],
      phonenumber: [''],
      phonenumber2: [''],
      city: [''],
      district: [''],
      taxoffice: [''],
      vkntcno: [''],
      note: [''],
      smsNotification: [''],
      emailNotification: [''],
      address: [''],
      customerdiscount: [''],
      customerGroup: [''],
      recordDate: [''],
    });
  }

  ngOnInit() {
    console.log("data -------> ", this.data)

    this.customerEditForm.patchValue({
      firstname:this.data.customerDetailForm.firstname,
      lastname:this.data.customerDetailForm.lastname,
      email: this.data.customerDetailForm.email,
      phonenumber: this.data.customerDetailForm.phonenumber,
      phonenumber2: this.data.customerDetailForm.phonenumber,
      city: this.data.customerDetailForm.city,
      district: this.data.customerDetailForm.district,
      taxoffice: this.data.customerDetailForm.taxoffice,
      vkntcno: this.data.customerDetailForm.vkntcno,
      note: this.data.customerDetailForm.note,
      smsNotification: this.data.customerDetailForm.smsNotification,
      emailNotification: this.data.customerDetailForm.emailNotification,
      address: this.data.customerDetailForm.address,
      customerdiscount: this.data.customerDetailForm.customerdiscount,
      customerGroup: this.data.customerDetailForm.customerGroup,
      recordDate: this.data.customerDetailForm.recordDate,
    });

  }

  updateCustomerDetail(): void {
    this.updateCustomerDetailDto = this.customerEditForm.value;
    this.updateCustomerDetailDto.id = this.data.customerId;
    this.updateCustomerDetailDto.firstname = this.data.firstname;
    this.updateCustomerDetailDto.lastname = this.data.lastname;
    // this.updateCustomerDetailDto.lastname = this.data.value.lastname;
    this.updateCustomerDetailDto.taxoffice = this.data.taxoffice;

    const model = {
      customerDetailsDto: this.updateCustomerDetailDto
    }
    this._customerService.updateCustomerById(model.customerDetailsDto).subscribe((response) => {
      if (response.isSuccessful) {
        console.log(response);
        this.showSweetAlert('success');
        this._dialogRef.close({ status: true });
      }
    });
  }

  getCustomerGroupList() {
    this._customergroup.getcustomerGroupList().subscribe((response) => {
        this.customergroupList = response.data;
    });
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

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  
}
