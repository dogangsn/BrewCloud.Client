import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';
import { GeneralService } from 'app/core/services/general/general.service';
import { AppointmentDto } from 'app/modules/admin/appointment/models/appointmentDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-appointment-history',
    templateUrl: './appointment-history.component.html',
    styleUrls: ['./appointment-history.component.css'],
})
export class AppointmentHistoryComponent implements OnInit {
  
    displayedColumns: string[] = [
        'complated',
        'beginDate',
        'text',
        'actions',
    ];
    @ViewChild('paginator') paginator: MatPaginator;
    
    selectedCustomerId: any;
    appointmentList : AppointmentDto[] = [];
    dataSource = new MatTableDataSource<AppointmentDto>(this.appointmentList);

    constructor(
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<any>,
        private _translocoService: TranslocoService,
        private _appointmentService: AppointmentService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.selectedCustomerId = data;
    }

    ngOnInit() {
        this.getAppointmentsByIdList();
    }

    getAppointmentsByIdList() {

        const model = {
            CustomerId :  this.selectedCustomerId.customerId
        }
        this._appointmentService.getAppointmentsByIdList(model).subscribe((response) => {
            this.appointmentList = response.data;
            this.dataSource = new MatTableDataSource<AppointmentDto>(
                this.appointmentList
            );
            this.dataSource.paginator = this.paginator;
        });
    } 

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

    public redirectToUpdate = (id: string) => {
    }

    public redirectToDelete = (id: string) => {
        const sweetAlertDto = new SweetAlertDto(
            this.translate('sweetalert.areYouSure'),
            this.translate('sweetalert.areYouSureDelete'),
            SweetalertType.warning
        );
        GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
            (swalResponse) => {
                if (swalResponse.isConfirmed) {
                    const model = {
                        id: id,
                    };
                    this._appointmentService
                        .deleteAppointment(model)
                        .subscribe((response) => {
                            if (response.isSuccessful) {
                                this.getAppointmentsByIdList();
                                const sweetAlertDto2 = new SweetAlertDto(
                                    this.translate('sweetalert.success'),
                                    this.translate('sweetalert.transactionSuccessful'),
                                    SweetalertType.success
                                );
                                GeneralService.sweetAlert(sweetAlertDto2);
                            } else {
                                console.error('Silme işlemi başarısız.');
                            }
                        });
                }
            }
        );
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

    toggleCompleted(item: any): void {

        item.isComplated = !item.isComplated;
        const model = {
            id :  item.id,
            isCompleted : item.isComplated
        }
        this._appointmentService.updateCompletedAppointment(model).subscribe((response) => {
            this.getAppointmentsByIdList();
        });
        console.log(item);
    }

}
