import { ExaminationListDto } from './../../models/ExaminationListDto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExaminationService } from 'app/core/services/examination/exammination.service';
import { ExaminationaddComponent } from '../examinationadd/examinationadd.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExaminationAddDialogComponent } from '../examination-add-dialog/examination-add-dialog.component';
import { ExaminationDto } from '../../models/ExaminationDto';

@Component({
  selector: 'app-examinationlist',
  templateUrl: './examinationlist.component.html',
  styleUrls: ['./examinationlist.component.css']
})
export class ExaminationlistComponent implements OnInit {

  examinationList : ExaminationListDto[] = [];
  dataSource = new MatTableDataSource<ExaminationListDto>(this.examinationList);
  loader = true;
  examination : ExaminationDto;

  displayedColumns: string[] = [
    'date',
    // 'muayneDurumu',
    'customerName',
    'patientName',
    // 'bodyTemperature',
    // 'pulse',
    // 'respiratoryRate',
    'weight',
    'complaintStory',
    'treatmentDescription',
    'symptoms',
    'actions'
  ];
  
  @ViewChild('paginator') paginator: MatPaginator;
  isUpdateButtonActive: boolean = false;
  
  constructor(
    private _examinationService : ExaminationService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getExaminationList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
}

  getExaminationList() {
    debugger
    this._examinationService.getExaminationlist().subscribe((response) => {
      debugger
        this.examinationList = response.data;
        this.dataSource = new MatTableDataSource<ExaminationListDto>(
            this.examinationList
        );
        this.dataSource.paginator = this.paginator;

        this.loader=false;
    
    });
}

addPanelOpen(): void {

  const dialog = this._dialog
      .open(ExaminationAddDialogComponent, {
          maxWidth: '100vw !important',
          data: null,
      })
      .afterClosed()
      .subscribe((response) => {
          if (response.status) {
              this.getExaminationList();
          }
      });
      
}

public redirectToUpdate = (id: string) => {
  this.isUpdateButtonActive = true;
  debugger
  const selectedExamination = this.examinationList.find((x) => x.id === id);
  var model = {
    id: selectedExamination.id
}
  // this._examinationService.getExaminationlistById(model).subscribe((response) => {
  //   debugger
  //     this.examination = response.data;
  // });
  if (selectedExamination) {
    const dialogRef = this._dialog.open(
      ExaminationAddDialogComponent,
      {
        maxWidth: '100vw !important',
        disableClose: true,
        data: selectedExamination.id
      }
    );
    dialogRef.afterClosed().subscribe((response) => {
      if (response.status) {
        this.getExaminationList();
      }
    });
  }
};

}
