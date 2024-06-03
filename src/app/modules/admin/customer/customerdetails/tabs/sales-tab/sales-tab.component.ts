import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerDataService } from '../../services/customer-data.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { TranslocoService } from '@ngneat/transloco';
import { SalesCustomerListDto } from './models/salesCustomerListDto';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';

@Component({
  selector: 'app-sales-tab',
  templateUrl: './sales-tab.component.html',
  styleUrls: ['./sales-tab.component.css']
})
export class SalesTabComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['salesContent', 'amount', 'collection', 'rameiningBalance', 'actions'];
  dataSource: any;
  receivedCustomerId: string;
  salesCustomerLis : SalesCustomerListDto[] = [];

  constructor(
    private _customerDataService: CustomerDataService,
    private _customerService: CustomerService,
    private _translocoService: TranslocoService
  ) {

  }

  ngOnInit() {
    this.receivedCustomerId = this._customerDataService.getCustomerId();
    this.getSalesCustomerList();
  }


  getSalesCustomerList(): void {
    const model = {
      customerId: this.receivedCustomerId,
    };

    this._customerService.getSalesCustomerList(model).subscribe({
      next: (response) => {
        this.salesCustomerLis = response.data;
        this.dataSource = this.salesCustomerLis;
 
      },
      error: (err) => {
        console.error(err);
        this.showSweetAlert('error', 'Failed to load patient data.');
      }
    });
  }

  showSweetAlert(type: string, message: string): void {
    let sweetAlertDto: SweetAlertDto;

    if (type === 'success') {
      sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.success'),
        message || this.translate('sweetalert.transactionSuccessful'),
        SweetalertType.success
      );
    } else {
      sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.error'),
        message || this.translate('sweetalert.transactionFailed'),
        SweetalertType.error
      );
    }
    GeneralService.sweetAlert(sweetAlertDto);
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(date).toLocaleString('tr-TR', options);
  }


}
