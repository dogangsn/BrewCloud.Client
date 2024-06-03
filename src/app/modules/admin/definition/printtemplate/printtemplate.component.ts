import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateeditPrinttemplateComponent } from './dialog/createedit-printtemplate.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PrintTemplateListDto } from './models/printtemplatelistdto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-printtemplate',
  templateUrl: './printtemplate.component.html',
  styleUrls: ['./printtemplate.component.css']
})
export class PrinttemplateComponent implements OnInit {

  displayedColumns: string[] = ['active', 'templatename', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  productcategories: PrintTemplateListDto[] = [];
  dataSource = new MatTableDataSource<PrintTemplateListDto>(
    this.productcategories
  );

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
