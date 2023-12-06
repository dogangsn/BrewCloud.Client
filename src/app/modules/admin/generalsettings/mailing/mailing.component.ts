import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { SmtpSettingsDto } from './models/smtpSettingsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { MailingService } from 'app/core/services/generalsettings/mailing/mailing.service';

@Component({
    selector: 'app-mailing',
    templateUrl: './mailing.component.html',
    styleUrls: ['./mailing.component.css'],
})
export class MailingComponent implements OnInit, AfterViewInit {
    mailingForm: UntypedFormGroup;

    @ViewChild('paginator') paginator: MatPaginator;
    smtpsettings: SmtpSettingsDto[] = [];
    dataSource = new MatTableDataSource<SmtpSettingsDto>(this.smtpsettings);

    displayedColumns: string[] = ['displayName', 'emailId', 'actions'];

    constructor(
        private _dialog: MatDialog,
        private _translocoService: TranslocoService,
        private _mailingService : MailingService
    ) {}

    ngOnInit() {
      this.getSmtMailingList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getSmtMailingList(): void {
      this._mailingService.getMailSettingsList().subscribe((response) => {
          this.smtpsettings = response.data;
   
          this.dataSource = new MatTableDataSource<SmtpSettingsDto>(
              this.smtpsettings
          );

          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
      });
  }

    addPanelOpen(): void {
        // const dialog = this._dialog
        //     .open(CreateEditTitleComponent, {
        //         maxWidth: '100vw !important',
        //         disableClose: true,
        //         data: null,
        //     })
        //     .afterClosed()
        //     .subscribe((response) => {
        //         debugger;
        //         if (response.status) {
        //             this.getTileList();
        //         }
        //     });
    }

    public redirectToUpdate = (id: string) => {
      // this.isUpdateButtonActive = true;
      const selectedTile = this.smtpsettings.find((title) => title.id === id);
      if (selectedTile) {
          // const dialogRef = this._dialog.open(
          //     CreateEditTitleComponent,
          //     {
          //         maxWidth: '100vw !important',
          //         disableClose: true,
          //         data: selectedTile
          //     }
          // );
          // dialogRef.afterClosed().subscribe((response) => {
          //     if (response.status) {
          //         this.getTileList();
          //     }
          // });
      }
  };

  public redirectToDelete = (id: string) => {
      const sweetAlertDto = new SweetAlertDto(
          this.translate('sweetalert.areYouSure'),
          this.translate('sweetalert.areYouSureDelete'),
          SweetalertType.warning
      );
      GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
          (swalResponse) => {
              if (swalResponse.isConfirmed) {
                  // const model = {
                  //     id: id,
                  // };
                  // this._titleService
                  //     .deleteTitle(model)
                  //     .subscribe((response) => {
                  //         if (response.isSuccessful) {
                  //             this.getTileList();
                  //             const sweetAlertDto2 = new SweetAlertDto(
                  //                 this.translate('sweetalert.success'),
                  //                 this.translate('sweetalert.transactionSuccessful'),
                  //                 SweetalertType.success
                  //             );
                  //             GeneralService.sweetAlert(sweetAlertDto2);
                  //         } else {
                  //             console.error('Silme işlemi başarısız.');
                  //         }
                  //     });
              }
          }
      );
  };

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
