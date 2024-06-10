import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';
import { GeneralService } from 'app/core/services/general/general.service';
import { DailyAppointmentListDto } from 'app/modules/admin/appointment/dailyappointment/models/dailyappointmentlistdto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { CustomerDataService } from 'app/modules/admin/customer/customerdetails/services/customer-data.service';

@Component({
  selector: 'app-patient-appointments-tab',
  templateUrl: './patient-appointments-tab.component.html',
  styleUrls: ['./patient-appointments-tab.component.css']
})
export class PatientAppointmentsTabComponent implements OnInit {
  displayedColumns: string[] = ['date', 'customerPatientName', 'services', 'statusName', 'actions'];

  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  
  dailyappointment: DailyAppointmentListDto[] = [];
  dataSource = new MatTableDataSource<DailyAppointmentListDto>(this.dailyappointment);
  loader = true;
  receivedPatientId: string;

  constructor(
    private _appointmentService: AppointmentService,
    private _translocoService: TranslocoService,
    private _customerDataService: CustomerDataService
  ) { }

  ngOnInit() {
    this.receivedPatientId = this._customerDataService.getPatientId();
    this.getAppointmentDailyList();
  }

  getAppointmentDailyList() {
const model ={
  PatientId : this.receivedPatientId
}
debugger
    this._appointmentService
      .getAppointmentListByPatientId(model)
      .subscribe((response) => {
        this.dailyappointment = response.data;
        this.dataSource = new MatTableDataSource<DailyAppointmentListDto>(
          this.dailyappointment
        );
        this.dataSource.paginator = this.paginator;

        this.loader = false;
      });
  }


  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  public redirectToUpdate = (id: string) => {
    // const selectedAppointment = this.dailyappointment.find((item) => item.id == id);
    // if (selectedAppointment) {
    //     const model = {
    //         visibleCustomer: false,
    //         selectedAppointment: selectedAppointment,
    //         customerId: this.selectedCustomerId
    //     };
    //     const dialogRef = this._dialog.open(
    //         EditAppointmentComponent,
    //         {
    //             maxWidth: '100vw !important',
    //             disableClose: true,
    //             data: model
    //         }
    //     );
    //     dialogRef.afterClosed().subscribe((response) => {
    //         if (response.status) {
    //             this.getAppointmentDailyList();
    //         }
    //     });
    // }
  }

  public redirectToDelete = (id: string) => {
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
          this._appointmentService
            .deleteAppointment(model)
            .subscribe((response) => {
              if (response.isSuccessful) {
                this.getAppointmentDailyList();
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

  public redirectStatusUpdate = (id: string, status: number) => {
    const model = {
      id: id,
      status : status
    };
    this._appointmentService
      .updateAppointmentStatus(model)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.getAppointmentDailyList();
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
