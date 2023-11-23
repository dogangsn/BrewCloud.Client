import { CustomerService } from './../../../../../core/services/customers/customers.service';
import { Component, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { customersListDto } from 'app/modules/admin/customer/models/customersListDto';
import { AppointmentDto } from '../../models/appointmentDto';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';

@Component({
    selector: 'app-add-apponitnment-dialog',
    templateUrl: './add-apponitnment-dialog.component.html',
    styleUrls: ['./add-apponitnment-dialog.component.css'],
})
export class AddApponitnmentDialogComponent implements OnInit {
    appointmentAdd: FormGroup;
    selectedCustomer: string;
    selectedDoctor: string;
    customers: customersListDto[] = [];
    appointment: AppointmentDto;
    selectedAppointmentForm: FormGroup;
  

    constructor(
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<any>,
        private _customerService: CustomerService,
        private _appointmentService: AppointmentService,
        private _translocoService: TranslocoService,
    ) {}

    ngOnInit() {
        this.getCustomerList();
        this.appointmentAdd = this._formBuilder.group({
            customerId: [''],
            doctorId: [''],
            note: [''],
            beginDate: [''],
            endDate: [''],
        });
    }
    getCustomerList() {
        this._customerService.getcustomerlist().subscribe((response) => {
            debugger;
            this.customers = response.data;
        });
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addOrUpdateAppointment(): void {
        debugger;
        this.appointment = this.appointmentAdd.value;
        this._appointmentService.createAppointment(this.appointment).subscribe(
            (response) => {
                debugger;

                if (response.isSuccessful) {
                    this.showSweetAlert('success');
                    this._dialogRef.close({
                        status: true,
                    });
                } else {
                    this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );
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
