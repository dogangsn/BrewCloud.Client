import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-sales',
  templateUrl: './create-edit-sales.component.html',
})
export class CreateEditSalesComponent implements OnInit {

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    // @Inject(MAT_DIALOG_DATA) private _data: { note: Note },
    // private _notesService: NotesService,
    private _matDialogRef: MatDialogRef<CreateEditSalesComponent>
  ) { }

  ngOnInit() {
  }

}
