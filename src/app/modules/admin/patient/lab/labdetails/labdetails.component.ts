
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { LabService } from 'app/core/services/lab/lab.service';
import { PatientListService } from 'app/core/services/patient/patientList/patientList.service';
import { DxHtmlEditorTypes } from 'devextreme-angular/ui/html-editor';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { LabDocumentDetailDto, LabDocumentDto } from '../model/labdocumentdetaildto';
import { LabuploaddocumentComponent } from '../labuploaddocument/labuploaddocument.component';

@Component({
  selector: 'app-labdetails',
  templateUrl: './labdetails.component.html',
  styleUrls: ['./labdetails.component.scss'],
})

export class LabDetailsComponent implements OnInit {


  destroy$: Subject<boolean> = new Subject<boolean>();
  valueContent: string;
  selectedDocument: boolean = false;
  editorValueType: DxHtmlEditorTypes.MarkupType = 'html';

  labdocumentdto: LabDocumentDetailDto;
  labdocuementlist: LabDocumentDto[] = [];
  patientId: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _labService: LabService,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.patientId = params['id'];
      console.log('Hasta ID:', this.patientId);
    });

    const model = {
      PatientId: this.patientId,
    }
    zip(
      this.getByIdLabDetails(model)
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => {
        this.setLabDetails(value[0])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.labdocuementlist = this.labdocumentdto.labDocuments;
      }
    });

  }



  getByIdLabDetails(model: any): Observable<any> {
    return this._labService.getLabDocumentById(model);
  }

  setLabDetails(response: any): void {
    if (response.data) {
      this.labdocumentdto = response.data;
    }
  }

 
  downloadDocument(document: Document): void {
    // const link = document.createElement('a');
    // link.href = document.fileUrl;
    // link.download = document.name;
    // link.click();
  }

  openFileUpload() {
    const dialog = this._dialog
      .open(LabuploaddocumentComponent, {
        maxWidth: '100vw !important',
        disableClose: true,
        data: null,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response.status) {
          const model = {
            PatientId: this.patientId,
          }
          zip(
            this.getByIdLabDetails(model)
          ).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: (value) => {
              this.setLabDetails(value[0])
            },
            error: (e) => {
              console.log(e);
            },
            complete: () => {
              this.labdocuementlist = this.labdocumentdto.labDocuments;
            }
          });
        }
      });
  }

}



