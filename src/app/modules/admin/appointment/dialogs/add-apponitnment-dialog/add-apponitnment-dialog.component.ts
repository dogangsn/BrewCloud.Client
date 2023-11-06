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

@Component({
  selector: 'app-add-apponitnment-dialog',
  templateUrl: './add-apponitnment-dialog.component.html',
  styleUrls: ['./add-apponitnment-dialog.component.css']
})
export class AddApponitnmentDialogComponent implements OnInit {

  appointmentAdd: FormGroup;
  selectedCustomer: string;
  selectedDoctor: string;
  customers: customersListDto[]=[];
  appointment: AppointmentDto;
  selectedAppointmentForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<any>,
    private _customerService: CustomerService,
    ) { }

  ngOnInit() {
    this.getCustomerList();
    this.appointmentAdd = this._formBuilder.group({
      customer: [''],
      doctor: [''],
      phoneNumber: [''],
      eMail: [''],
      vKNTCNo: [''],
      note: [''],
      appointmentDate: [''],
      appointmentTime: [''],
  });

  }
  getCustomerList() {
    this._customerService.getcustomerlist().subscribe((response) => {
      debugger
        this.customers = response.data;
    });
}

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  addOrUpdateAppointment(): void {
    debugger
    this.appointment = this.appointmentAdd.value;
  }


}
