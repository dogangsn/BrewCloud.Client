import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DailyAppointmentListDto } from './models/dailyappointmentlistdto';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';

@Component({
  selector: 'app-dailyappointment',
  templateUrl: './dailyappointment.component.html',
  styleUrls: ['./dailyappointment.component.css']
})
export class DailyappointmentComponent implements OnInit {

  displayedColumns: string[] = ['date', 'customerPatientName', 'services', 'statusName', 'actions'];

  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  dailyappointment: DailyAppointmentListDto[] = [];
  dataSource = new MatTableDataSource<DailyAppointmentListDto>(this.dailyappointment);
  loader = true;

  constructor( 
    private _appointmentService: AppointmentService,

  ) { }

  ngOnInit() {
    this.getAppointmentDailyList();
  }

  getAppointmentDailyList() {

    this._appointmentService
      .getAppointmentDailyList()
      .subscribe((response) => {
        this.dailyappointment = response.data;  
        this.dataSource = new MatTableDataSource<DailyAppointmentListDto>(
          this.dailyappointment
        );
        this.dataSource.paginator = this.paginator;

        this.loader = false;
      });
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
}
