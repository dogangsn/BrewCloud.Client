import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';

@Component({
    selector: 'app-pay-chart',
    templateUrl: './pay-chart.component.html',
    styleUrls: ['./pay-chart.component.css'],
})
export class PayChartComponent implements OnInit {
  
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

    selectedCustomerId: any;
    payChartList: any[] = [];
    dataSource = new MatTableDataSource<any>(this.payChartList);

    constructor(       
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<any>,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
          this.selectedCustomerId = data;
        }

    ngOnInit() {}

    closeDialog(): void {
      this._dialogRef.close({ status: null });
  }

  showSweetAlert(type: string): void {
      if (type === 'success') {
          const sweetAlertDto = new SweetAlertDto(
              this.translate('sweetalert.success'),
              this.translate('sweetalert.transactionSuccessful'),
              SweetalertType.success
          );
          GeneralService.sweetAlert(sweetAlertDto);
      } else {
          const sweetAlertDto = new SweetAlertDto(
              this.translate('sweetalert.error'),
              this.translate('sweetalert.transactionFailed'),
              SweetalertType.error
          );
          GeneralService.sweetAlert(sweetAlertDto);
      }
  }

  translate(key: string): any {
      return this._translocoService.translate(key);
  }



}
