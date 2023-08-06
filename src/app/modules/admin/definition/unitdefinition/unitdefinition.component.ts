import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUnitDefinitionDialogComponent } from './dialogs/create-edit-unitdefinition';

@Component({
  selector: 'app-Unit',
  templateUrl: './unitdefinition.component.html',
  styleUrls: ['./unitdefinition.component.scss']
})
export class UnitComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }



  addPanelOpen(): void {
    //this.erpfinancemonitorForm.reset();
    //this.isUpdateButtonActive = false;

    const dialog = this._dialog
        .open(CreateEditUnitDefinitionDialogComponent, {
            maxWidth: '100vw !important',
            disableClose: true,
            data: null,
        })
        .afterClosed()
        .subscribe((response) => {
            if (response.status) {
                //this.getErpFinanceMonitors();
            }
        });
}

}
