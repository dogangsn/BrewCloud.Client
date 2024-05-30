import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-smstransactions-dialog',
  templateUrl: './smstransactions-dialog.component.html',
  styleUrls: ['./smstransactions-dialog.component.css']
})
export class SmstransactionsDialogComponent implements OnInit {


  smstransactionsgroup: FormGroup;
  buttonDisabled = false;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService,
  ) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  sendSms(): void {
    this.buttonDisabled = true;

  }

}
