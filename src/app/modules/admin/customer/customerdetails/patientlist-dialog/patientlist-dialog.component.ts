import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'; 
import { PatientOwnerListDto } from 'app/modules/admin/patient/patientlist/models/patientOwnerListDto';

@Component({
  selector: 'app-patientlist-dialog',
  templateUrl: './patientlist-dialog.component.html',
  styleUrls: ['./patientlist-dialog.component.css']
})
export class PatientlistDialogComponent implements OnInit {

  displayedColumns: string[] = ['name', 'animalTypeName', 'customerFirsLastName', 'actions'];

  patientList: PatientOwnerListDto[] = [];
  dataSource = new MatTableDataSource<PatientOwnerListDto>(this.patientList);
  
  firstlastname: string = "";

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.firstlastname = data.firstlastname;
  }

  ngOnInit() {

  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }


}
