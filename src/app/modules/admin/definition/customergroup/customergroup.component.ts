import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerGroupListDto } from './models/customerGroupListDto';
import { CreateEditCustomerGroupDialogComponent } from './dialogs/create-edit-customergroup';
import { CustomerGroupService } from 'app/core/services/definition/customergroup/customergroup.service';

@Component({
    selector: 'app-customergroup',
    templateUrl: './customergroup.component.html',
    styleUrls: ['./customergroup.component.css'],
})
export class CustomergroupComponent implements OnInit {
    displayedColumns: string[] = [ 'name', 'code', 'update', 'delete'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    customergroup: CustomerGroupListDto[] = [];
    dataSource = new MatTableDataSource<CustomerGroupListDto>(
        this.customergroup
    );
    
    isUpdateButtonActive: boolean;

    constructor(private _dialog: MatDialog,private _customergroup: CustomerGroupService) {}

    ngOnInit() {
        this.CustomerGroupList();
    }

    CustomerGroupList() {
        this._customergroup
            .getcustomerGroupList()
            .subscribe((response) => {
                this.customergroup = response.data;
                console.log(this.customergroup);
            });
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        this.isUpdateButtonActive = false;
        const dialog = this._dialog
            .open(CreateEditCustomerGroupDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    this.CustomerGroupList();
                }
            });
    }

    editProductCategories(model: CustomerGroupListDto): void {
        this.isUpdateButtonActive = true;

        // this._productcategoryservice.getDeviceInfoId(model).subscribe((response) => {
        //     if (response.isSuccessful) {
        //         this.selectedPdksDeviceInfo = response.data;
        //         const dialog = this._dialog.open(CreateEditPdksDeviceInfoDialogComponent, {
        //             maxWidth: '100vw !important',
        //             disableClose: true,
        //             data: this.selectedPdksDeviceInfo
        //         }).afterClosed().subscribe((err) => {
        //             if (err.status) {
        //                 this.getPdksDeviceInfos();
        //             }
        //         });

        //     } else {
        //         //başarısız
        //     }
        // });
    }

    public redirectToUpdate = (id: string) => {

    }

    public redirectToDelete = (id: string) => {
      
    }



}
