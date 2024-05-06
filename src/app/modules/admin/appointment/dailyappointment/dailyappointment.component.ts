import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DailyAppointmentListDto } from './models/dailyappointmentlistdto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dailyappointment',
  templateUrl: './dailyappointment.component.html',
  styleUrls: ['./dailyappointment.component.css']
})
export class DailyappointmentComponent implements OnInit {

  displayedColumns: string[] = ['date', 'customerPatientName', 'services', 'services', 'actions'];

  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  dailyappointment: DailyAppointmentListDto[] = [];
  dataSource = new MatTableDataSource<DailyAppointmentListDto>(this.dailyappointment);


  constructor() { }

  ngOnInit() {
  }

}
