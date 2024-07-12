import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { ParametersService } from 'app/core/services/settings/parameters.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { SmsParametersDto } from '../../settings/smsparameters/models/smsParameterDto';
import { SmsTemplateService } from 'app/core/services/definition/SmsTemplate/smstemplate.service';
import { SmsType } from '../../definition/smstemplate/models/smsType.enum';
import { SmsTemplateListDto } from '../../definition/smstemplate/models/smstemplatelistDto';


@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnInit {

  sendmessage: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  smsparameters: SmsParametersDto[] = []

  messageType: SmsType;
  templatelist: SmsTemplateListDto[] = [];
  isFixMessage: boolean;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService,
    private _parametersService: ParametersService,
    private _smstemplateService: SmsTemplateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.messageType = data.messageType;
    this.isFixMessage = data.isFixMessage;
  }

  ngOnInit() {

    this.sendmessage = this._formBuilder.group({
      enableSMS: false,
      enableAppNotification: false,
      enableEmail: false,
      enableWhatsapp: false,
      templatecontent: ['', Validators.required]
    })

    zip(
      this.getSmsParametersList(),
      this.getSmsTemplate(this.messageType)
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => {
        this.setProducesResponse(value[0]),
          this.setTemplate(value[1])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        if (this.smsparameters.length > 0) {
          this.sendmessage.get('enableSMS')?.setValue(true);
        }
      }
    });

  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  sendMessage(): void {

    const sweetAlertDto = new SweetAlertDto(
      "Mesaj Gönderilecektir. Emin Misiniz ?",
      this.translate('sweetalert.areYouSureDelete'),
      SweetalertType.warning
    );
    GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
      (swalResponse) => {
        if (swalResponse.isConfirmed) {
        }
      });

  }

  getSmsParametersList(): Observable<any> {
    return this._parametersService.getSmsParametersList();
  }

  setProducesResponse(response: any): void {
    this.smsparameters = response.data;
  }

  getSmsTemplate(type): Observable<any> {
    var model = {
      type: type
    }
    return this._smstemplateService.getSmsTemplateIdBy(model);
  }

  setTemplate(response: any): void {
    this.templatelist = response.data;
  }





}
