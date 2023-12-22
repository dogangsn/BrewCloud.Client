import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';

@Component({
    selector: 'app-collection-transactions-dialog',
    templateUrl: './collection-transactions-dialog.component.html',
    styleUrls: ['./collection-transactions-dialog.component.css'],
})
export class ColectionTransactionsDialogComponent implements OnInit {

    displayedColumns: string[] = [
        'operationNumber',
        'date',
        'paymentType',
        'note',
        'amount',
        'actions',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    
    selectedCustomerId: any;
    collectionTransactionsList : any[] = [];
    dataSource = new MatTableDataSource<any>(this.collectionTransactionsList);
    
    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
    ) {}

    ngOnInit(): void {
        
    }


    showSweetAlert(type: string, message: string): void {
        if (type === 'success') {
            const sweetAlertDto = new SweetAlertDto(
                this.translate(message),
                this.translate('sweetalert.transactionSuccessful'),
                SweetalertType.success
            );
            GeneralService.sweetAlert(sweetAlertDto);
        } else {
            const sweetAlertDto = new SweetAlertDto(
                this.translate(message),
                this.translate('sweetalert.transactionFailed'),
                SweetalertType.error
            );
            GeneralService.sweetAlert(sweetAlertDto);
        }
    }

    translate(key: string): any {
        return this._translocoService.translate(key);
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    
}
