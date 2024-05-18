import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDetailDto } from '../../../models/CustomerDetailDto';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { MatDialog } from '@angular/material/dialog';
import { PatientDetailsDto } from '../../../models/PatientDetailsDto';
import { PatientDetails } from '../../../models/PatientDetailsCommand';
import { CustomerDataService } from '../../services/customer-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['./patient-tab.component.css'],
})

export class PatientTabComponent implements OnInit {

  displayedColumns: string[] = ['name', 'birthDate', 'chipNumber', 'animalType' ];

    

  @ViewChild('paginator') paginator: MatPaginator;
  receivedCustomerId: string;
  patientList: PatientDetailsDto[] = [];
  dataSource = new MatTableDataSource<PatientDetailsDto>(this.patientList);
  loader=true;

  constructor(
    private _customerDataService: CustomerDataService,
    private _customerService: CustomerService
  ) { }

  ngOnInit() {
    debugger
    this.receivedCustomerId = this._customerDataService.getCustomerId(); 
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getPatients();
  }

  getPatients(): void {
    const model = {
      customerId: this.receivedCustomerId,
      visibleCustomer: false,
      patientId: null,
    };
    const patientModel = {
      id: this.receivedCustomerId,
    };
    this._customerService
      .getPatientsByCustomerId(patientModel)
      .subscribe((response) => {
        this.patientList = response.data;
        this.dataSource = new MatTableDataSource<PatientDetailsDto>(
          this.patientList
      );
      this.dataSource.paginator = this.paginator;
        this.loader=false;
      });
  }
}
