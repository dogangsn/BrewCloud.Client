import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VaccineListDto } from './models/vaccineListDto';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditVaccineDialogComponent } from './dialogs/create-edit-vaccine';

@Component({
  selector: 'app-vaccinelist',
  templateUrl: './vaccinelist.component.html',
  styleUrls: ['./vaccinelist.component.css']
})
export class VaccinelistComponent implements OnInit {

  displayedColumns: string[] = ['animalTypeName', 'vaccineName', 'timeDone', 'renewalOption', 'actions'];
  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  units: VaccineListDto[] = [];
  dataSource = new MatTableDataSource<VaccineListDto>(this.units);


  constructor(private _dialog: MatDialog,) {

  }

  ngOnInit() {
  }


  addPanelOpen(): void {
    this.isUpdateButtonActive = false;
    const dialog = this._dialog
      .open(CreateEditVaccineDialogComponent, {
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
