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

  displayedColumns: string[] = ['date', 'customerPatientName', 'services', 'status', 'actions'];

  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  dailyappointment: DailyAppointmentListDto[] = [];
  dataSource = new MatTableDataSource<DailyAppointmentListDto>(this.dailyappointment);


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
      });
  }

}
