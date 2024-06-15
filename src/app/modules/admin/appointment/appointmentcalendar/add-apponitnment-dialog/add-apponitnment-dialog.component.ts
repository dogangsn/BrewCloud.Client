
import { CustomerService } from '../../../../../core/services/customers/customers.service';
import { Component, Inject, OnInit } from '@angular/core';
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
import { AppointmentDto } from '../models/appointmentDto';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { AppointmentTypeDto } from '../models/appointmentTypeDto';
import { VetUsersDto } from '../models/vetusersDto';
import { CreateAppointmentCommand } from '../models/createAppointmentCommand';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { ProductDescriptionsDto } from 'app/modules/admin/definition/productdescription/models/ProductDescriptionsDto';
import { addVaccineDto } from '../models/addVaccineDto';
import { v4 as uuidv4 } from 'uuid';
import { PatientDetails } from 'app/modules/admin/customer/models/PatientDetailsCommand';
import { AppointmentTypeservice } from 'app/core/services/definition/appointmenttypes/appointmenttypes.service';
import { AppointmentTypesDto } from 'app/modules/admin/definition/appointmenttypes/models/appointmentTypesDto';
import { VaccineService } from 'app/core/services/definition/vaccinelist/vaccinelist.service';
import { VaccineListDto } from 'app/modules/admin/definition/vaccinelist/models/vaccineListDto';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { ParametersService } from 'app/core/services/settings/parameters.service';
import { parametersListDto } from 'app/modules/admin/settings/parameters/models/parametersListDto';

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
    selectedAppointmentType: number;
    selectedAppointmentForm: FormGroup; 
    addVaccineList: addVaccineDto[] = [];
    vetDoctorList: VetUsersDto[] = [];
    patientList: PatientDetails[] = [];
    selectedAppointment: AppointmentDto;
    appointmentTypes: AppointmentTypesDto[] = [];
    visibleCustomer: boolean;
    now: Date = new Date();
    lastSelectedValue: Date = new Date();
    selectedCustomerId: any;
    selectedPatientId: any;
    selectedVaccine: UntypedFormGroup;

    morning8 = new Date();
    evening8 = new Date();
    today = new Date();

    statusTypeList = Object.keys(StatusTypeValues).map(key => ({ value: +key, label: StatusTypeValues[key] }));
    selectedStatus: number | null = null;
    vaccine: VaccineListDto[] = [];
    destroy$: Subject<boolean> = new Subject<boolean>();
    parameters: parametersListDto[] = [];
    buttonDisabled: boolean = false;
    controlDate= new Date();

    constructor(
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<any>,
        private _customerService: CustomerService,
        private _appointmentService: AppointmentService, 
        private _translocoService: TranslocoService,
        private _appointmenttypesService: AppointmentTypeservice,
        private _vaccineService: VaccineService,
        private _parameterService: ParametersService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (!this.visibleCustomer) {
            if (data.patinetlist !== undefined && data.patinetlist !== null) {
                this.patientList = data.patinetlist;
            }
        }
        this.selectedAppointment = data.selectedAppointment;
        this.selectedCustomerId = data.customerId;
        this.selectedPatientId = data.patientId;
        this.visibleCustomer = data.visibleCustomer;
        this.morning8.setHours(8, 0, 0, 0);
        this.evening8.setHours(20, 0, 0, 0);
        this._parameterService.getparameterList().subscribe((response) => {
            debugger
            this.parameters = response.data;
            const [beginHours, beginMinutes] = this.parameters[0].appointmentBeginDate.split(':').map(Number);
            this.morning8.setHours(beginHours);
            this.morning8.setMinutes(beginMinutes);

            const [endHours, endMinutes] = this.parameters[0].appointmentEndDate.split(':').map(Number);
            this.evening8.setHours(endHours);
            this.evening8.setMinutes(endMinutes);
        });
    }

    timeIntervals: any = {
        type: 'time',
        interval: 60,
        min: this.morning8,
        max: this.evening8
    };

    ngOnInit() {

        zip(
        this.getVaccineList(),
        this.getAppointmentTypeList(),
        this.getCustomerList(),
        this.getApponitmentDoctorList(),
        ).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (value) => {
                this.setVaccineList(value[0]),
                this.setAppointmentTypeList(value[1]),
                this.setCustomerList(value[2]),
                this.setApponitmentDoctorList(value[3])
            },
            error: (e) => {
                console.log(e);
            },
            complete: () => {

            }
        });
debugger
        this.appointmentAdd = this._formBuilder.group({
            doctorId: ['00000000-0000-0000-0000-000000000000'],
            appointmentType: [2, Validators.required],
            customerId: [''],
            patientId: [''],
            note: [''],
            status: [1]
        });

        if (!this.selectedAppointment) {
            this.selectedStatus = 1;
        }

        const newId = uuidv4();
        const model: addVaccineDto = {
            id: newId,
            date: this.now,
            isComplated: false,
            productId: '00000000-0000-0000-0000-000000000000',
        };
        this.addVaccineList.push(model);

        if (this.selectedPatientId != null) {
            debugger
            this.handleCustomerChange(this.selectedCustomerId)
            // this.appointmentAdd.get('patientId').patchValue(this.selectedPatientId);
        }

        // this.fillFormData(this.selectedAppointment);

    }

    getCustomerList(): Observable<any> {
        return this._customerService.getcustomerlist();
    }

    setCustomerList(response: any): void {
        if (response.data) {
            this.customers = response.data;
        }
    }

    getVaccineList(): Observable<any> {
        const model = {
            AnimalType : 0
        };
    
        return this._vaccineService
        .getVaccineList(model);
    }

    setVaccineList(response: any): void {
        if (response.data) {
            this.vaccine = response.data;
        }
    }

    getAppointmentTypeList(): Observable<any> {
        return this._appointmenttypesService.getAppointmentTypes();
    }

    setAppointmentTypeList(response: any): void {
        if (response.data) {
            this.appointmentTypes = response.data;
        }
    }

    getApponitmentDoctorList(): Observable<any> {
        return this._appointmentService.getUserTitleList();
    }

    setApponitmentDoctorList(response: any): void {
        if (response.data) {
            debugger
            this.vetDoctorList = response.data;
        }
    }

    getPatientList() {
        debugger
        this._customerService.getPatientsByCustomerId(this.customers[0].id).subscribe((response) => {
            this.patientList = response.data;
        });
    }

    

    handleCustomerChange(event: any) {
        const model = {
            id: event.value
        }
        if (model.id == undefined) {
            model.id = event;
        }

        debugger;
        this._customerService.getPatientsByCustomerId(model).subscribe((response) => {
            this.patientList = response.data;
            if (this.patientList.length === 1) {
                this.appointmentAdd.get('patientId').patchValue(this.patientList[0].id);
            }
        });
    }

    

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    getFormValueByName(formName: string): any {
        return this.appointmentAdd.get(formName).value;
    }

    addOrUpdateAppointment(): void {

        const sweetAlertDto = new SweetAlertDto(
            this.translate('sweetalert.areYouSure'),
            this.translate('sweetalert.apponitnmentAreSure'),
            SweetalertType.warning
        );
        GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
            (swalResponse) => {
                if (swalResponse.isConfirmed) {
                    const item = new CreateAppointmentCommand(
                        this.lastSelectedValue,
                        ((this.getFormValueByName('doctorId') === undefined || this.getFormValueByName('doctorId') === null) ? '00000000-0000-0000-0000-000000000000' : this.getFormValueByName('doctorId')),
                        (this.visibleCustomer == true ? this.getFormValueByName('customerId') : this.selectedCustomerId),
                        this.getFormValueByName('note'),
                        this.getFormValueByName('appointmentType'),
                        this.selectedStatus,
                        this.getFormValueByName('patientId'),
                        this.addVaccineList
                    );
                    debugger;

                    if (this.validateControl()) {
                        this.buttonDisabled = false;
                        return;
                    }
                    this._appointmentService.createAppointment(item).subscribe(
                        (response) => {
                            debugger;

                            if (response.isSuccessful) {
                                this.showSweetAlert('success','sweetalert.transactionSuccessful');
                                this._dialogRef.close({
                                    status: true,
                                });
                            } else {
                                this.showSweetAlert('error','sweetalert.transactionFailed');
                            }
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                }
            }
        );
    }

    validateControl(): boolean {

        debugger;
        if (this.lastSelectedValue <= this.morning8 || this.lastSelectedValue.getHours()>this.evening8.getHours()) {
            this.showSweetAlert(
                'error',
                'Randevu saatleri uygun değil!'
            );
            return true;
        }
        return false;
    }

    addVaccine() {
        const newId = uuidv4();
        const model: addVaccineDto = {
            id: newId,
            date: this.now,
            isComplated: false,
            productId: '00000000-0000-0000-0000-000000000000',
        };
        this.addVaccineList.push(model);
    }

    showSweetAlert(type: string, text: string): void {
        if (type === 'success') {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.success'),
                this.translate(text),
                SweetalertType.success
            );
            GeneralService.sweetAlert(sweetAlertDto);
        } else {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.error'),
                this.translate(text),
                SweetalertType.error
            );
            GeneralService.sweetAlert(sweetAlertDto);
        }
    }

    translate(key: string): any {
        return this._translocoService.translate(key);
    }

    onAppointmentTypeChange(event: any) {
        debugger;
        this.selectedAppointmentType = event.value;
    }

    handleValueChangeList(event: any, selectedId: any) {
        let selected = this.addVaccineList.find((x) => x.id == selectedId);
        if (selected) {
            selected.date = event.value;
        }
    }

    onVaccineTypeChange(event: any, selectedId: any) {
        let selected = this.addVaccineList.find((x) => x.id == selectedId);
        if (selected) {
            selected.productId = event.value;
        }
    }

    onCheckboxChange(event: any, selectedId: any) {
        const isChecked = event.checked;

        let selected = this.addVaccineList.find((x) => x.id == selectedId);
        if (selected) {
            selected.isComplated = isChecked;
        }
    }

    handleValueChange(e) {
        debugger
        this.controlDate = e.value
        if (this.controlDate.getHours() <= this.morning8.getHours() ||this.controlDate <= this.morning8 || this.controlDate.getHours() >= this.evening8.getHours()) {
            this.showSweetAlert(
                'error',
                'Randevu saatleri uygun değil!'
            );
            this.buttonDisabled=true;
        }else{
            this.buttonDisabled=false;
        }
        this.lastSelectedValue = e.value; // Son seçilen değeri saklıyoruz
        
        console.log('Yeni tarih ve saat: ', this.lastSelectedValue);
        // Yeni değeri kullanmak için burada işlemler yapabilirsiniz
    }

    public deletedVaccine = (id: string) => {
        const selectedvaccine = this.addVaccineList.findIndex((item) => item.id === id);
        if (selectedvaccine !== -1) {
            this.addVaccineList.splice(selectedvaccine, 1);
        }
    }

    fillFormData(selectedAppointments: AppointmentDto) {

        if (this.selectedAppointment !== null) {
            this.appointmentAdd.setValue({

            });
        }
    }

    onStatusChange(event: any) {
        this.selectedStatus = event.value;
        console.log("Seçilen değer:", this.selectedStatus);
    }

    

}


const StatusTypeValues = {
    1: "Bekliyor",
    2: "IptalEdildi",
    3: "Gorusuldu",
    4: "Gelmedi"
};

