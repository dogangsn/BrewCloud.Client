import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditProductCategoriesDialogComponent } from './dialogs/create-edit-productcategory';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }



  addPanelOpen(): void {
    //this.erpfinancemonitorForm.reset();
    //this.isUpdateButtonActive = false;

    const dialog = this._dialog
        .open(CreateEditProductCategoriesDialogComponent, {
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
