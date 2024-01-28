import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { AppointmentTypeDto } from 'app/modules/admin/appointment/models/appointmentTypeDto';
import { AppointmentDto } from 'app/modules/admin/appointment/models/appointmentDto';

@Component({
    selector: 'app-edit-appointment.component',
    templateUrl: './edit-appointment.component.html',
    styleUrls: ['./edit-appointment.component.css'],
})
export class EditAppointmentComponent implements OnInit {
    appointmentEdit: FormGroup;
    appointmentsList: AppointmentTypeDto[] = [];
    selectedCustomerId: any;
    selectedAppointment : AppointmentDto;
    selectedAppointmentType: number;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log(data);
        this.selectedAppointment = data.selectedAppointment;
        this.selectedCustomerId = data.customerId;
    }

    ngOnInit(): void {
        this.appointmentsList = appointments;

        this.appointmentEdit = this._formBuilder.group({
            appointmentType: [2, Validators.required],
        });

        this.fillFormData(this.selectedAppointment);
    }

    fillFormData(selected: AppointmentDto) {
        if (this.selectedAppointment !== null) {
            this.appointmentEdit.setValue({
                appointmentType : selected.appointmentType
            });
        }
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

    onAppointmentTypeChange(event: any) {
        this.selectedAppointmentType = event.value;
    }

}

const appointments: AppointmentTypeDto[] = [
    {
        id: 1,
        remark: 'Aşı Randevusu',
    },
    {
        id: 2,
        remark: 'Genel Muayene',
    },
    {
        id: 3,
        remark: 'Kontrol Muayene',
    },
    {
        id: 4,
        remark: 'Operasyon',
    },
    {
        id: 5,
        remark: 'Tıraş',
    },
    {
        id: 6,
        remark: 'Tedavi',
    },
];
