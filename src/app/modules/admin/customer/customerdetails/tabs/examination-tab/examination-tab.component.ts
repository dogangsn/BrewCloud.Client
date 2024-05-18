import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PatientDetailsDto } from '../../../models/PatientDetailsDto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-examination-tab',
  templateUrl: './examination-tab.component.html',
  styleUrls: ['./examination-tab.component.css']
})
export class ExaminationTabComponent implements OnInit {

  displayedColumns: string[] = [
    'date', 
    'customerName',
    'patientName',  
    'weight',
    'complaintStory',
    'treatmentDescription',
    'symptoms',
    'actions'
  ];

  @ViewChild('paginator') paginator: MatPaginator;
  receivedCustomerId: string;
  patientList: PatientDetailsDto[] = [];
  dataSource = new MatTableDataSource<PatientDetailsDto>(this.patientList);
  loader=true;

  constructor() { }

  ngOnInit() {
  }

}
