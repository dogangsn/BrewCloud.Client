import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerDataService } from '../../../services/customer-data.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';

@Component({
  selector: 'app-smstransactions-dialog',
  templateUrl: './smstransactions-dialog.component.html',
  styleUrls: ['./smstransactions-dialog.component.css']
})
export class SmstransactionsDialogComponent implements OnInit {


  smstransactionsgroup: FormGroup;
  buttonDisabled = false;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService,
    private _customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.smstransactionsgroup = this._formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  getFormValueByName(formName: string): any {
    return this.smstransactionsgroup.get(formName).value;
  }

  sendSms(): void {
    this.buttonDisabled = true;

    var model = {
      type: 1,
      title: this.getFormValueByName('title'),
      content: this.getFormValueByName('content'),
      phoneNumber : '05398533010'
    }

    this._customerService.sendMessage(model).subscribe(response => {
      if (response.isSuccessful) {

      }
    });

  }

  showSweetAlert(type: string, text: string): void {
    if (type === 'success') {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.success'),
        this.translate(text),
        SweetalertType.success
      );
      GeneralService.sweetAlert(sweetAlertDto);
    } else {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.error'),
        this.translate(text),
        SweetalertType.error
      );
      GeneralService.sweetAlert(sweetAlertDto);
    }
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
  }
}
