import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto'; 
import { PayChartListDto } from '../../pay-chart/model/PayChartListDto';
import { CustomerDataService } from '../../services/customer-data.service';

@Component({
    selector: 'app-pay-chart-tab',
    templateUrl: './paychart-tab.component.html',
    styleUrls: ['./paychart-tab.component.scss'],
})
export class PayChartTabComponent implements OnInit {
 
    displayedColumns: string[] = [
        'date',
        'operation',
        'debit',
        'paid',
        'totalPaid',
        'total',
        'actions',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    customerId: any;
    payChartList: PayChartListDto[] = [];
    dataSource = new MatTableDataSource<any>(this.payChartList);

    constructor(
        private _formBuilder: FormBuilder, 
        private _translocoService: TranslocoService,
        private _customerService: CustomerService,
        private _customerDataService: CustomerDataService,
    ) { 
    }

    ngOnInit() { 
        this.customerId = this._customerDataService.getCustomerId(); 
      
    }

    ngAfterViewInit() {
        this.getPaymentTransactiopnList();
    }

    getPaymentTransactiopnList() {

        const model = {
            CustomerId: this.customerId
        }

        this._customerService
            .getPayChartList(model)
            .subscribe((response) => {
                this.payChartList = response.data;
                this.dataSource = new MatTableDataSource<PayChartListDto>(
                    this.payChartList
                );
    
                this.dataSource.paginator = this.paginator;

            });
    }

    formatDate(date: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(date).toLocaleString('tr-TR', options);
    }

}