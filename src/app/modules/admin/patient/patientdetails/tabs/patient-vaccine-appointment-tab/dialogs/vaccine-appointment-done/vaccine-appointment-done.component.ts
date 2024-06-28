import { Component, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { VaccineService } from 'app/core/services/definition/vaccinelist/vaccinelist.service';
import { GeneralService } from 'app/core/services/general/general.service';
import { PatientListService } from 'app/core/services/patient/patientList/patientList.service';
import { VaccineCalendarService } from 'app/core/services/vaccinecalendar/vaccinecalendar.service';
import { CustomerDetailDto } from 'app/modules/admin/customer/models/CustomerDetailDto';
import { PatientDetailsDto } from 'app/modules/admin/customer/models/PatientDetailsDto';
import { VaccineListDto } from 'app/modules/admin/definition/vaccinelist/models/vaccineListDto';
import { CreateVetVaccineCalendarDto } from 'app/modules/admin/patient/createvaccine/models/create-vaccine-appoitment-dto';
import { CreateVaccineListDto } from 'app/modules/admin/patient/createvaccine/models/vaccine-examination-list-dto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { Observable, Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vaccine-appointment-done',
  templateUrl: './vaccine-appointment-done.component.html',
  styleUrls: ['./vaccine-appointment-done.component.css']
})
export class VaccineAppointmentDoneComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  vaccineAppointmentForm: FormGroup;
  vaccineAppointment: CreateVaccineListDto;
  createVaccineExamination: CreateVetVaccineCalendarDto;
  patient: PatientDetailsDto;
  customer: CustomerDetailDto;
  vaccine: VaccineListDto;
  stylesheet = document.styleSheets[0];
  loader = true;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CreateVaccineListDto,
    private _formBuilder: UntypedFormBuilder,
    private _patientService: PatientListService,
    private _vaccineCalendarService: VaccineCalendarService,
    private _customerService: CustomerService,
    private _vaccineService: VaccineService,
    private _translocoService: TranslocoService,
  ) {
    this.vaccineAppointment = data;
  }

  ngOnInit() {

    (this.stylesheet as CSSStyleSheet).insertRule('body.light, body .light { position: fixed;}', 0);

    this.vaccineAppointmentForm = this._formBuilder.group({
      patientName: [''],
      vaccineName: [''],
      vaccineDate: [''],
      doneDate: [''],
      nextVaccinationDate: [''],
    });

    zip(this.getVaccineAppointment())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.setVaccineAppointment(value[0]);
        },
        complete() {
          this.loader = false;
        },
        error: (e) => {
          console.log(e);
        },
      });
  }


  getVaccineAppointment(): Observable<any> {
    const model = {
      Id: this.vaccineAppointment.id,
    };
    return this._vaccineCalendarService.getPatientVaccineList(model);
  }

  setVaccineAppointment(response: any): void {
    if (response.data) {
      this.createVaccineExamination = response.data;
      this.getPatient(this.createVaccineExamination[0].patientId);
      this.getVaccine(this.createVaccineExamination[0].vaccineId);
      this.getCustomer(this.createVaccineExamination[0].customerId);
    }
  }

  getPatient(patientId: string) {
    const model = {
      Id: patientId,
    };
    this._patientService.getPatientFindById(model).subscribe((response) => {
      this.patient = response.data;
    });
  }

  getCustomer(customerId: string) {
    const model = {
      Id: customerId,
    };
    this._customerService.getCustomersFindById(model).subscribe((response) => {
      this.customer = response.data;
      this.fillFormData();
    });
  }

  getVaccine(vaccineId: string) {
    const model = {
      Id: vaccineId,
    };
    this._vaccineService.getVaccineList(model).subscribe((response) => {
      this.vaccine = response.data;
    });
  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
    for (let index = 0; index < this.stylesheet.cssRules.length; index++) {
      if (this.stylesheet.cssRules[index].cssText === 'body.light, body .light { position: fixed; }') {
          (this.stylesheet as CSSStyleSheet).deleteRule(index);
      }
  }
  }

  fillFormData() {

    const nextVaccinationDate = new Date();
    if (this.vaccine[0].timeDone>0) {
      nextVaccinationDate.setDate(nextVaccinationDate.getDate() + this.vaccine[0].timeDone);
    }

    this.vaccineAppointmentForm.setValue({
      patientName: this.patient.name,
      vaccineName: this.vaccineAppointment.vaccineName,
      vaccineDate: this.vaccineAppointment.vaccineDate,
      doneDate: new Date(),
      nextVaccinationDate: nextVaccinationDate
    });

    this.loader = false;
  }

  getFormValueByName(formName: string): any {
    return this.vaccineAppointmentForm.get(formName).value;
  }

  saveVaccineAppointment() {

    const model = {
      Id: this.vaccineAppointment.id,
      VaccinationDate: this.getFormValueByName('vaccineDate'),
      NextVaccinationDate: this.getFormValueByName('nextVaccinationDate')
    }

    this._vaccineCalendarService.updateVaccineExamination(model).subscribe(
      (response) => {
        if (response.isSuccessful) {
          this.showSweetAlert('success');
          this._dialogRef.close({
            status: true,
          });
          for (let index = 0; index < this.stylesheet.cssRules.length; index++) {
            if (this.stylesheet.cssRules[index].cssText === 'body.light, body .light { position: fixed; }') {
                (this.stylesheet as CSSStyleSheet).deleteRule(index);
            }
        }
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
