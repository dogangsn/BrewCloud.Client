import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { PersonnelService } from 'app/core/services/gympersonnel/personnel.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { PersonnelPermissionDto } from '../models/PersonnelPermissionDto';
import { CreateEditPersonnelPermissionComponent } from './dialogs/create-edit-personnel-permission/create-edit-personnel-permission.component';

@Component({
  selector: 'app-personnelpermission',
  templateUrl: './personnelpermission.component.html',
  styleUrls: ['./personnelpermission.component.css']
})
export class PersonnelpermissionComponent implements OnInit {
  personnelPermissionList: PersonnelPermissionDto[] = [];
  isUpdateButtonActive: boolean;
  displayedColumns: string[] = ['name'
    , 'permissionTypeName'
    , 'isApproved'
    , 'beginDate'
    , 'endDate'
    , 'actions'
  ];
  constructor(
    private _dialog: MatDialog,
    private personnelService: PersonnelService,
    private _translocoService: TranslocoService
  ) { }

  ngOnInit() {
    this.getGymPersonnelPermissionList();
  }

  addPanelOpen(): void {
    const dialog = this._dialog
      .open(CreateEditPersonnelPermissionComponent, {
        maxWidth: '100vw !important',
        disableClose: true,
        data: null,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response.status) {
          this.getGymPersonnelPermissionList();
        }
      });
  }

  getGymPersonnelPermissionList(): void {
    this.personnelService.getGymPersonnelPermissionList().subscribe((response) => {
      if (response.isSuccessful) {
        if (response.data) {
          this.personnelPermissionList = response.data;
        }
      }
    });
  }

  public redirectToUpdate = (id: string) => {
    this.isUpdateButtonActive = true;
    const selectedItem = this.personnelPermissionList.find((x) => x.id === id);

    if (selectedItem) {
      const dialogRef = this._dialog.open(
        CreateEditPersonnelPermissionComponent,
        {
          maxWidth: '100vw !important',
          disableClose: true,
          data: selectedItem
        }
      );
      dialogRef.afterClosed().subscribe((response) => {
        if (response.status) {
          this.getGymPersonnelPermissionList();
        }
      });
    }
  };

  public redirectToDelete = (id: string) => {

    const selectedItem = this.personnelPermissionList.find((item) => item.id === id);

    const sweetAlertDto = new SweetAlertDto(
      this.translate('sweetalert.areYouSure'),
      this.translate('sweetalert.areYouSureDelete'),
      SweetalertType.warning
    );

    GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
      (swalResponse) => {
        if (swalResponse.isConfirmed) {
          const model = {
            id: id,
          };
          this.personnelService
            .deleteGymPersonnelPermission(model)
            .subscribe((response) => {
              if (response.isSuccessful) {
                this.getGymPersonnelPermissionList();
                const sweetAlertDto2 = new SweetAlertDto(
                  this.translate('sweetalert.success'),
                  this.translate('sweetalert.transactionSuccessful'),
                  SweetalertType.success
                );
                GeneralService.sweetAlert(sweetAlertDto2);
              } else {
                console.error('Silme işlemi başarısız.');
              }
            });
        }
      }
    );
  };

  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(date).toLocaleString('tr-TR', options);
  }

}
