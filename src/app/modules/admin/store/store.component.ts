import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { StoreListDto } from './models/StoreListDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'app/core/services/store/store.service';
import { CreateEditStoreDialogComponent } from './dialogs/create-edit-store';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
    displayedColumns: string[] = [
        'depotName',
        'depotCode',
        'active',
        'update',
        'delete',
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    storeList: StoreListDto[] = [];
    dataSource = new MatTableDataSource<StoreListDto>(this.storeList);
    isUpdateButtonActive: boolean;

    constructor(
        private _dialog: MatDialog,
        private _storeservice: StoreService
    ) {}

    ngOnInit() {
      this.getStoreList();
    }

    getStoreList() {
        this._storeservice.getStoreList().subscribe((response) => {
            this.storeList = response.data;
        });
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        this.isUpdateButtonActive = false;
        const dialog = this._dialog
            .open(CreateEditStoreDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    this.getStoreList();
                }
            });
    }
}
