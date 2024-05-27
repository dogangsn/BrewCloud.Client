import { CustomerService } from './../../../../../core/services/customers/customers.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; 
import { PatientOwnerListDto } from 'app/modules/admin/patient/patientlist/models/patientOwnerListDto';
import { PatientDetails } from '../../models/PatientDetailsCommand';
import { id } from 'date-fns/locale';
import { CustomerDetailDto } from '../../models/CustomerDetailDto';
import { Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patientlist-dialog',
  templateUrl: './patientlist-dialog.component.html',
  styleUrls: ['./patientlist-dialog.component.css']
})
export class PatientlistDialogComponent implements OnInit {

  displayedColumns: string[] = ['name', 'animalType', 'actions'];

  patientList: PatientDetails[] = [];
  customer: CustomerDetailDto;
  dataSource = new MatTableDataSource<PatientDetails>(this.patientList);
  
  customerId: string = "";
  customerName: string = "";

  @ViewChild('paginator') paginator: MatPaginator;
  loader: boolean = true;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _customerService : CustomerService
  ) {
    this.customerId = data.customerId;
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    zip(
      this.getPatientList(),
      this.getCustomer(),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (value) => {
              this.setPatientList(value[0]),
                  this.setCustomer(value[1])
          },
          error: (e) => {
              console.log(e);
          },
          complete: () => {
          },
      });
  }



  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }
  getCustomer(): Observable<any> {
    const model = {
      id : this.customerId
    }
    return this._customerService.getCustomersFindById(model)

  };

  
  setCustomer(response: any): void {
    if (response.data) {
        this.customer = response.data;
    }
}
  

  getPatientList(): Observable<any> {
    const model = {
      id : this.customerId
  }
    return this._customerService.getPatientsByCustomerId(model)

}

setPatientList(response: any): void {
  if (response.data) {
      this.patientList = response.data;
  }
    this.dataSource = new MatTableDataSource<PatientDetails>(
            this.patientList
        );
        this.dataSource.paginator = this.paginator;

        this.loader = false;
}


}
