import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { AccommodationsRoonService } from 'app/core/services/pethotels/accommodationrooms/accommodationsroom.service';
import { AccommodationsService } from 'app/core/services/pethotels/accommodations/accommodation.service';
import { PatientDetails } from 'app/modules/admin/customer/models/PatientDetailsCommand';
import { customersListDto } from 'app/modules/admin/customer/models/customersListDto';
import { RoomListDto } from '../../../accommodationrooms/models/roomListDto';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { PaymentMethodsDto } from 'app/modules/admin/definition/paymentmethods/models/PaymentMethodsDto';
import { PaymentMethodservice } from 'app/core/services/definition/paymentmethods/paymentmethods.service';

@Component({
  selector: 'app-accommodationexit',
  templateUrl: './accommodationexit.component.html',
  styleUrls: ['./accommodationexit.component.css']
})
export class AccommodationexitComponent implements OnInit {

  selectedaccomodationexit: any;
  buttonDisabled = false;
  accommodationexit: FormGroup;
  patientList: PatientDetails[] = [];
  customers: customersListDto[] = [];
  rooms: RoomListDto[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  now: Date = new Date();
  selectedCheckinDate: Date = new Date();
  selectedCheckOutDate: Date = new Date();

  payments: PaymentMethodsDto[] = [];

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService,
    private _accommodationrooms: AccommodationsRoonService,
    private _customerService: CustomerService,
    private _accomodations: AccommodationsService,
    private _paymentmethodsService: PaymentMethodservice,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedaccomodationexit = data;
  }

  ngOnInit() {

    zip(
      this.getCustomerList(),
      this.getRoomList(),
      this.paymentsList()

    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => {
        this.setCustomerList(value[0]),
          this.setRoomList(value[1]),
          this.setpaymentList(value[2])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {

      }
    });



  }

  fillFormData(selectedAccomodation: any) {

    if (this.selectedaccomodationexit !== null) {
      this.accommodationexit.setValue({
        customerId: selectedAccomodation.customerId,
        patientId: selectedAccomodation.patientId,
        roomId: selectedAccomodation.roomId
      });
    }
  }


  getCustomerList(): Observable<any> {
    return this._customerService.getcustomerlist();
  }

  setCustomerList(response: any): void {
    if (response.data) {
      this.customers = response.data;
    }
  }

  getRoomList() {
    return this._accommodationrooms.getRoomList();
  }

  setRoomList(response: any): void {
    if (response.data) {
      this.rooms = response.data;
    }
  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  addOrUpdateAccommodationExit(): void {

  }

  handleCustomerChange(event: any) {
    const model = {
      id: event.value,
    };
    if (model.id == undefined) {
      model.id = event;
    }

    this._customerService
      .getPatientsByCustomerId(model)
      .subscribe((response) => {
        this.patientList = response.data;
        if (this.patientList.length === 1) {
        }
      });
  }


  handleValueChange(e) {
    this.selectedCheckinDate = e.value;
  }

  handleValueCheckOutChange(e) {
    this.selectedCheckOutDate = e.value;
  }

  paymentsList(): Observable<any> {
    return this._paymentmethodsService.getPaymentMethodsList();

  }

  setpaymentList(response: any): void {
    if (response.data) {
      this.payments = response.data;
    }
  }





}
