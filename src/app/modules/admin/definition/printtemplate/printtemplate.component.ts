import { Component, OnInit } from '@angular/core';
import { CreateeditPrinttemplateComponent } from './dialog/createedit-printtemplate.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-printtemplate',
  templateUrl: './printtemplate.component.html',
  styleUrls: ['./printtemplate.component.css']
})
export class PrinttemplateComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
  }


  
  addPanelOpen(): void { 
    const dialog = this._dialog
        .open(CreateeditPrinttemplateComponent, {
            maxWidth: '100vw !important',
            disableClose: true,
            data: null,
        })
        .afterClosed()
        .subscribe((response) => {
            if (response.status) { 
            }
        });
}

}
