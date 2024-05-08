
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
    productdescription: ProductDescriptionsDto[] = [];
    addVaccineList: addVaccineDto[] = [];
    appointmentsList: AppointmentTypeDto[] = [];
    vetDoctorList: VetUsersDto[] = [];
    patientList: PatientDetails[] = [];
    selectedAppointment: AppointmentDto;

    visibleCustomer: boolean;
    now: Date = new Date();
    lastSelectedValue: Date = new Date();
    selectedCustomerId: any;
    selectedPatientId: any;
    selectedVaccine: UntypedFormGroup;

    morning8 = new Date();
    evening8 = new Date();

    statusTypeList = Object.keys(StatusTypeValues).map(key => ({ value: +key, label: StatusTypeValues[key] }));
    selectedStatus: number | null = null;


    constructor(
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<any>,
        private _customerService: CustomerService,
        private _appointmentService: AppointmentService,
        private _productdescriptionService: ProductDescriptionService,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.selectedAppointment = data.selectedAppointment;
        this.selectedCustomerId = data.customerId;
        this.selectedPatientId = data.patientId;
        this.visibleCustomer = data.visibleCustomer;
        this.morning8.setHours(8, 0, 0, 0);
        this.evening8.setHours(20, 0, 0, 0);
    }

    timeIntervals: any = {
        type: 'time',
        interval: 60,
        min: this.morning8,
        max: this.evening8
    };

    ngOnInit() {
        this.appointmentsList = appointments;

        this.getCustomerList();
        this.getApponitmentDoctorList();
        this.getProductList();

        this.appointmentAdd = this._formBuilder.group({
            doctorId: ['00000000-0000-0000-0000-000000000000'],
            appointmentType: [2, Validators.required],
            customerId: [''],
            patientId: [''],
            note: [''],
            status : [1]
        });

        if(!this.selectedAppointment) {
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

        this.fillFormData(this.selectedAppointment);

    }

    getProductList() {
        const model = {
            ProductType: 2,
        };
        this._productdescriptionService
            .getProductDescriptionFilters(model)
            .subscribe((response) => {
                this.productdescription = response.data;
                console.log(this.productdescription);
            });
    }

    getCustomerList() {
        this._customerService.getcustomerlist().subscribe((response) => {
            this.customers = response.data;
        });
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
                this.appointmentAdd.get('patientId').patchValue(this.patientList[0].recId);
            }
        });
    }

    getApponitmentDoctorList() {
        this._appointmentService.getUserTitleList().subscribe((response) => {
            this.vetDoctorList = response.data;
            console.log(response.data);
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

                    this._appointmentService.createAppointment(item).subscribe(
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
            }
        );
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
