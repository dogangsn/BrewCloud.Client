import { Component, OnInit } from '@angular/core';
import { CreateEditPersonnelComponent } from './dialogs/create-edit-personnel/create-edit-personnel.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonnelDto } from './models/PersonnelDto';
import { PersonnelService } from 'app/core/services/gympersonnel/personnel.service';
import { xorBy } from 'lodash';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  personnelList: PersonnelDto[] = [];
  isUpdateButtonActive: boolean;
  displayedColumns: string[] = ['name'
    , 'surName'
    , 'phoneNumber'
    , 'phoneNumber2'
    , 'email'
    , 'graduate'
    , 'actions'
  ];
  constructor(
    private _dialog: MatDialog,
    private personnelService: PersonnelService,
    private _translocoService: TranslocoService
  ) { }

  ngOnInit() {
    this.getGymPersonnelList();
  }

  addPanelOpen(): void {
    const dialog = this._dialog
      .open(CreateEditPersonnelComponent, {
        maxWidth: '100vw !important',
        disableClose: true,
        data: null,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response.status) {
          this.getGymPersonnelList();
        }
      });
  }

  getGymPersonnelList(): void {
    this.personnelService.getGymPersonnelList().subscribe((response) => {
      if (response.isSuccessful) {
        if (response.data) {
          this.personnelList = response.data;
        }
      }
    });
  }

  public redirectToUpdate = (id: string) => {
    this.isUpdateButtonActive = true;
    const selectedItem = this.personnelList.find((x) => x.id === id);

    if (selectedItem) {
      const dialogRef = this._dialog.open(
        CreateEditPersonnelComponent,
        {
          maxWidth: '100vw !important',
          disableClose: true,
          data: selectedItem
        }
      );
      dialogRef.afterClosed().subscribe((response) => {
        if (response.status) {
          this.getGymPersonnelList();
        }
      });
    }
  };

  public redirectToDelete = (id: string) => {

    const selectedItem = this.personnelList.find((item) => item.id === id);

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
            .deleteGymPersonnel(model)
            .subscribe((response) => {
              if (response.isSuccessful) {
                this.getGymPersonnelList();
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

}
