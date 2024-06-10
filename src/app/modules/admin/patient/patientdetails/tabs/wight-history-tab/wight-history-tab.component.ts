import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientListService } from 'app/core/services/patient/patientList/patientList.service';
import { CustomerDataService } from 'app/modules/admin/customer/customerdetails/services/customer-data.service';
import { WeightControlDto } from '../../models/weightControlDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-wight-history-tab',
  templateUrl: './wight-history-tab.component.html',
  styleUrls: ['./wight-history-tab.component.css']
})
export class WightHistoryTabComponent implements OnInit {

  recievedPatientId:string;
  weighControls:WeightControlDto[] = [];

  dataSource = new MatTableDataSource<WeightControlDto>(this.weighControls);
  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['weight', 'controlDate'];

  constructor(
    private _customerDataService: CustomerDataService,
    private _patientService: PatientListService
  ) { }

  ngOnInit() {
    debugger
    this.recievedPatientId=this._customerDataService.getPatientId();
    this.getAccommodationsList();
  }

  getAccommodationsList() {

    const model = {
      PatientId: this.recievedPatientId
    }

    this._patientService.getWeightControls(model).subscribe((response) => {
      this.weighControls = response.data;
      this.dataSource = new MatTableDataSource<WeightControlDto>(
        this.weighControls
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  isWeightIncreased(element: any, index: number): boolean {
    if (index === 0 || index >= this.weighControls.length) {
      return element.weight > this.weighControls[index + 1].weight;;
    }
    return element.weight > this.weighControls[index - 1].weight;
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
