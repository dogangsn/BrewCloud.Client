import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-createedit-smstemplate',
  templateUrl: './createedit-smstemplate.component.html',
  styleUrls: ['./createedit-smstemplate.component.css']
})
export class CreateeditSmstemplateComponent implements OnInit {

  selectedsmstemplate: any;
  smstemplate: FormGroup;
  selectedOption: number = 1;

  availableOptions = [
    { name: 'İsim Soyisim', selected: false },
    { name: 'Tarih', selected: false },
    { name: 'Hasta', selected: false }
  ];

  constructor(
    private _dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit() {
  }

  toggleSelection(option: any) {
    option.selected = !option.selected;
  }
  
  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

}
