import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { PatientDetailsDto } from '../../../models/PatientDetailsDto';
import { CustomerDataService } from '../../services/customer-data.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['./patient-tab.component.css'],
})

export class PatientTabComponent implements OnInit {

  displayedColumns: string[] = ['name', 'birthDate', 'chipNumber', 'animalType', 'actions'];

  @ViewChild('paginator') paginator: MatPaginator;
  receivedCustomerId: string;
  patientList: PatientDetailsDto[] = [];
  dataSource = new MatTableDataSource<PatientDetailsDto>(this.patientList);
  loader = true;

  constructor(
    private _customerDataService: CustomerDataService,
    private _customerService: CustomerService,
    private _translocoService: TranslocoService
  ) { }

  ngOnInit() {
    this.receivedCustomerId = this._customerDataService.getCustomerId();
    this.getPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPatients(): void {
    const patientModel = {
      id: this.receivedCustomerId,
    };

    this._customerService.getPatientsByCustomerId(patientModel).subscribe({
      next: (response) => {
        this.patientList = response.data;
        this.dataSource.data = this.patientList;
        this.loader = false;
      },
      error: (err) => {
        console.error(err);
        this.showSweetAlert('error', 'Failed to load patient data.');
        this.loader = false;
      }
    });
  }

  showSweetAlert(type: string, message: string): void {
    let sweetAlertDto: SweetAlertDto;

    if (type === 'success') {
      sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.success'),
        message || this.translate('sweetalert.transactionSuccessful'),
        SweetalertType.success
      );
    } else {
      sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.error'),
        message || this.translate('sweetalert.transactionFailed'),
        SweetalertType.error
      );
    }

    GeneralService.sweetAlert(sweetAlertDto);
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(date).toLocaleString('tr-TR', options);
  }

}
