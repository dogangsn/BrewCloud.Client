import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AccomodationListDto } from './models/accomodationListDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AccommodationsService } from 'app/core/services/pethotels/accommodations/accommodation.service';
import { TranslocoService } from '@ngneat/transloco';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {

  displayedColumns: string[] = ['customerName', 'roomName', 'checkinDate', 'checkOutDate', 'actions'];

  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  accommodations: AccomodationListDto[] = [];
  dataSource = new MatTableDataSource<AccomodationListDto>(this.accommodations);

  constructor(
    private _dialog: MatDialog,
    private _accommodationrooms: AccommodationsService,
    private _translocoService: TranslocoService) { }

  ngOnInit() {
    this.getAccommodationsList();
  }

  getAccommodationsList() {
    // this._accommodationrooms.getRoomList().subscribe((response) => {
    //   this.rooms = response.data;
    //   this.dataSource = new MatTableDataSource<RoomListDto>(
    //     this.rooms
    //   );
    //   this.dataSource.paginator = this.paginator;
    // });
  }

  addPanelOpen(): void {
    // this.isUpdateButtonActive = false;
    // const dialog = this._dialog
    //   .open(CreateEditAccommodationRoomsDialogComponent, {
    //     maxWidth: '100vw !important',
    //     disableClose: true,
    //     data: null,
    //   })
    //   .afterClosed()
    //   .subscribe((response) => {
    //     if (response.status) {
    //         this.getRoomList();
    //     }
    //   });
  }

  showSweetAlert(type: string, message: string): void {
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
        this.translate(message),
        SweetalertType.error
      );
      GeneralService.sweetAlert(sweetAlertDto);
    }
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  public redirectToDelete = (id: string) => {
    // const sweetAlertDto = new SweetAlertDto(
    //   this.translate('sweetalert.areYouSure'),
    //   this.translate('sweetalert.areYouSureDelete'),
    //   SweetalertType.warning
    // );
    // GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
    //   (swalResponse) => {
    //     if (swalResponse.isConfirmed) {
    //       const model = {
    //         id: id,
    //       };
    //       this._accommodationrooms
    //         .deleteRoom(model)
    //         .subscribe((response) => {
    //           if (response.isSuccessful) {
    //             this.getRoomList();
    //             const sweetAlertDto2 = new SweetAlertDto(
    //               this.translate('sweetalert.success'),
    //               this.translate('sweetalert.transactionSuccessful'),
    //               SweetalertType.success
    //             );
    //             GeneralService.sweetAlert(sweetAlertDto2);
    //           } else {
    //             this.showSweetAlert('error', response.errors[0]);
    //             console.log(response.errors[0]);
    //           }
    //         });
    //     }
    //   }
    // );
  };

  public redirectToUpdate = (id: string) => {
    // this.isUpdateButtonActive = true;
    // const selectedroom = this.rooms.find((x) => x.id === id);
    // if (selectedroom) {
    //   const dialogRef = this._dialog.open(
    //     CreateEditAccommodationRoomsDialogComponent,
    //     {
    //       maxWidth: '100vw !important',
    //       disableClose: true,
    //       data: selectedroom
    //     }
    //   );
    //   dialogRef.afterClosed().subscribe((response) => {
    //     if (response.status) {
    //       this.getRoomList();
    //     }
    //   });
    // }
  };
}
