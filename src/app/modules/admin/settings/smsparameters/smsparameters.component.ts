import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { CreateEditSmsParameterDialogComponent } from './dialogs/create-edit-smsparameters';

@Component({
  selector: 'app-smsparameters',
  templateUrl: './smsparameters.component.html',
  styleUrls: ['./smsparameters.component.css']
})
export class SmsparametersComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _translocoService: TranslocoService
  ) {

  }

  ngOnInit() {
  }


  updatesms(type: number): void {

    const model = {
        smsparameterstype: type
    }
    const dialog = this._dialog
      .open(CreateEditSmsParameterDialogComponent, {
        maxWidth: '100vw !important',
        disableClose: true,
        data: model,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response.status) {
           
        }
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
}
