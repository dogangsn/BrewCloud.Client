import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { customersListDto } from '../../customer/models/customersListDto';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { LabService } from 'app/core/services/lab/lab.service';

@Component({
    selector: 'lab',
    templateUrl: './lab.component.html',
})
export class LabComponent implements OnInit {
    displayedColumns: string[] = [
        'firstName',
        'lastName',
        'phoneNumber',
        'phoneNumber2',
        'eMail',
        'note',
        'actions',
    ];
    loader = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    customerlist: customersListDto[] = [];
    dataSource = new MatTableDataSource<customersListDto>(this.customerlist);

    constructor(
        private _translocoService: TranslocoService,
        private _labService: LabService
    ) {}

    ngOnInit() {
      this.getCustomerLabList();
    }

    getCustomerLabList() {
        this._labService.getCustomersLabList().subscribe((response) => {
            this.customerlist = response.data;
            this.loader = false;
            console.log(this.customerlist);
        });
    }
}
