import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditProductDescriptionDialogComponent } from './dialogs/create-edit-productdescription';

@Component({
  selector: 'app-productdescription',
  templateUrl: './productdescription.component.html',
  styleUrls: ['./productdescription.component.css']
})
export class ProductdescriptionComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
  }


  addPanelOpen(): void {
    //this.erpfinancemonitorForm.reset();
    //this.isUpdateButtonActive = false;

   const dialog = this._dialog.open(CreateEditProductDescriptionDialogComponent, { maxWidth: '100vw !important', disableClose: true, data:null }).afterClosed().subscribe((response)=>{
        if(response.status){
            //this.getErpFinanceMonitors();
        }
    });
}


}
