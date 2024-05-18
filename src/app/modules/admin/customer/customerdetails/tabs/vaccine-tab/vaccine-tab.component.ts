import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VaccineListDto } from 'app/modules/admin/definition/vaccinelist/models/vaccineListDto';
import { CustomerDataService } from '../../services/customer-data.service'; 

@Component({
  selector: 'app-vaccine-tab',
  templateUrl: './vaccine-tab.component.html',
  styleUrls: ['./vaccine-tab.component.css']
})
export class VaccineTabComponent implements OnInit {

  displayedColumns: string[] = [
    'customerName',
    'vaccineName',
    'vaccineDate',
    'isvaccine',
    'actions'
  ];

  @ViewChild('paginator') paginator: MatPaginator;
  receivedCustomerId: string;
  vaccineList: VaccineListDto[] = [];
  dataSource = new MatTableDataSource<VaccineListDto>(this.vaccineList);
  loader = true;

  customerId: any;


  constructor(
    private _customerDataService: CustomerDataService, 
  ) {


  }

  ngOnInit() {
    this.customerId = this._customerDataService.getCustomerId();
  }






}
