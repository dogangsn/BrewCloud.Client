import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TinymceEditorService } from 'app/modules/bases/global/tinymce-editor.service';

@Component({
  selector: 'app-createedit-printtemplate',
  templateUrl: './createedit-printtemplate.component.html',
  styleUrls: ['./createedit-printtemplate.component.css']
})
export class CreateeditPrinttemplateComponent implements OnInit {

  selectedprinttemplate : any;
  tinymceOptions: any;
  buttonDisabled = false;
  printtemplate : FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _tinymceService: TinymceEditorService
  ) { }

  ngOnInit() {
    this.tinymceOptions = this._tinymceService.getTinymceOptions();
  }

  addOrUpdatePrintTemplate() : void {

  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }
}
