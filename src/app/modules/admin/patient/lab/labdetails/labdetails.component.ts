
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

@Component({
  selector: 'app-labdetails',
  templateUrl: './labdetails.component.html',
  styleUrls: ['./labdetails.component.scss'],
})

export class LabDetailsComponent implements OnInit {

  animal: Animal = {
    name: 'Kara',
    type: 'Kedi',
    age: 3
  };

  customer: Customer = {
    name: 'Mehmet Yılmaz',
    phone: '0555 555 55 55',
    email: 'mehmet@example.com'
  };

  documents: Document[] = [
    { name: 'Kan Testi Sonucu', date: new Date('2024-09-01'), fileUrl: 'path/to/kan-testi.pdf' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
    { name: 'Röntgen Görüntüsü', date: new Date('2024-08-21'), fileUrl: 'path/to/rontgen.jpg' },
  ];

  destroy$: Subject<boolean> = new Subject<boolean>();
  valueContent: string;
  selectedDocument: boolean = false;
  editorValueType: DxHtmlEditorTypes.MarkupType = 'html';

  labdocumentdto: any;
  patientId: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _labService: LabService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.patientId = data.patientId;
  }

  ngOnInit(): void {

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

  openFileDialog(): void {
    // const dialogRef = this.dialog.open(FileUploadDialogComponent, {
    //   width: '400px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Yüklenen dosyayı belgelere ekleme
    //     this.documents.push({
    //       name: result.fileName,
    //       date: new Date(),
    //       fileUrl: result.fileUrl
    //     });
    //   }
    // });
  }

  downloadDocument(document: Document): void {
    // const link = document.createElement('a');
    // link.href = document.fileUrl;
    // link.download = document.name;
    // link.click();
  }

}

interface Animal {
  name: string;
  type: string;
  age: number;
}

interface Customer {
  name: string;
  phone: string;
  email: string;
}

interface Document {
  name: string;
  date: Date;
  fileUrl: string;
}

