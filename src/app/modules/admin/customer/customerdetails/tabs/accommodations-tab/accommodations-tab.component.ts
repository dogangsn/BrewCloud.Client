import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccomodationListDto } from 'app/modules/admin/pethotels/accommodations/models/accomodationListDto';
import { CustomerDataService } from '../../services/customer-data.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { AccommodationsService } from 'app/core/services/pethotels/accommodations/accommodation.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-accommodations-tab',
  templateUrl: './accommodations-tab.component.html',
  styleUrls: ['./accommodations-tab.component.css']
})
export class AccommodationsTabComponent implements OnInit {

  displayedColumns: string[] = ['customerName', 'roomName', 'checkinDate', 'checkOutDate', 'isLogOut', 'actions'];

  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  accommodations: AccomodationListDto[] = [];
  dataSource = new MatTableDataSource<AccomodationListDto>(this.accommodations);
  receivedCustomerId: string;

  constructor(
    private _customerDataService: CustomerDataService,
    private _customerService: CustomerService,
    private _accommodationrooms: AccommodationsService,
    private _translocoService: TranslocoService
  ) { }

  ngOnInit() {
    this.receivedCustomerId = this._customerDataService.getCustomerId();
  }

  getAccommodationsList() {
    const model = {
      CustomerId: this.receivedCustomerId
    }
    this._accommodationrooms.getAccomodationList(model).subscribe((response) => {
      this.accommodations = response.data;
      this.dataSource = new MatTableDataSource<AccomodationListDto>(
        this.accommodations
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAccommodationsList();
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleString('tr-TR', options);
  }

  public redirectToDelete = (id: string) => {

    const selectedaccomotion = this.accommodations.find((x) => x.id === id);
    if (selectedaccomotion) {

      if (selectedaccomotion.isLogOut) {
        this.showSweetAlert('warning', 'Çıkış Yapılan Konaklama Silinemez');
        return;
      }

    }


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
          this._accommodationrooms
            .deleteAccomodation(model)
            .subscribe((response) => {
              if (response.isSuccessful) {
                this.getAccommodationsList();
                const sweetAlertDto2 = new SweetAlertDto(
                  this.translate('sweetalert.success'),
                  this.translate('sweetalert.transactionSuccessful'),
                  SweetalertType.success
                );
                GeneralService.sweetAlert(sweetAlertDto2);
              } else {
                this.showSweetAlert('error', response.errors[0]);
                console.log(response.errors[0]);
              }
            });
        }
      }
    );



  };

  showSweetAlert(type: string, message: string): void {
    if (type === 'success') {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.success'),
        this.translate('sweetalert.transactionSuccessful'),
        SweetalertType.success
      );
      GeneralService.sweetAlert(sweetAlertDto);
    } else if (type == 'warning') {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.warning'),
        this.translate(message),
        SweetalertType.warning
      );
      GeneralService.sweetAlert(sweetAlertDto);
    }
    else {
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


}
