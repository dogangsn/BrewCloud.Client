import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CreateeditSmstemplateComponent } from './dialog/createedit-smstemplate.component';

@Component({
  selector: 'app-smstemplate',
  templateUrl: './smstemplate.component.html',
  styleUrls: ['./smstemplate.component.css']
})
export class SmstemplateComponent implements OnInit {

  
  displayedColumns: string[] = ['active', 'templatename', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  smstemplate: any = [];

  constructor(private _dialog: MatDialog,) { }

  ngOnInit() {
  }

  addPanelOpen(): void {
    const dialog = this._dialog
      .open(CreateeditSmstemplateComponent, {
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
