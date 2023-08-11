import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUnitDefinitionDialogComponent } from './dialogs/create-edit-unitdefinition';
import { MatPaginator } from '@angular/material/paginator';
import { unitdefinitionListDto } from './models/unitdefinitionListDto';
import { MatTableDataSource } from '@angular/material/table';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';

@Component({
    selector: 'app-Unit',
    templateUrl: './unitdefinition.component.html',
    styleUrls: ['./unitdefinition.component.scss'],
})
export class UnitComponent implements OnInit {
    displayedColumns: string[] = ['unitCode', 'unitName'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    units: unitdefinitionListDto[] = [];
    dataSource = new MatTableDataSource<unitdefinitionListDto>(this.units);

    constructor(
        private _dialog: MatDialog,
        private _unitsservice: UnitsService
    ) {}

    ngOnInit() {
      this.UnitsList();
    }

    UnitsList() {
        this._unitsservice.getUnitsList().subscribe((response) => {
            this.units = response.data;
            console.log(this.units);
        });
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
