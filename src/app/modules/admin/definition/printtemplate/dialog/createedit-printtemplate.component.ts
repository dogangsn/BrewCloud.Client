import { Component, OnInit } from '@angular/core';
import { TinymceEditorService } from 'app/modules/bases/global/tinymce-editor.service';

@Component({
  selector: 'app-createedit-printtemplate',
  templateUrl: './createedit-printtemplate.component.html',
  styleUrls: ['./createedit-printtemplate.component.css']
})
export class CreateeditPrinttemplateComponent implements OnInit {

  tinymceOptions: any;

  constructor(
    private _tinymceService: TinymceEditorService
  ) { }

  ngOnInit() {
    this.tinymceOptions = this._tinymceService.getTinymceOptions();
  }

}
