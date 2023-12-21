import { CustomerService } from './../../../../../core/services/customers/customers.service';
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
import { AppointmentDto } from '../../models/appointmentDto';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { AppointmentTypeDto } from '../../models/appointmentTypeDto';
import { VetUsersDto } from '../../models/vetusersDto';
import { CreateAppointmentCommand } from '../../models/createAppointmentCommand';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { ProductDescriptionsDto } from 'app/modules/admin/definition/productdescription/models/ProductDescriptionsDto';
import { addVaccineDto } from '../../models/addVaccineDto';
import { v4 as uuidv4 } from 'uuid';

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

    now: Date = new Date();
    lastSelectedValue: Date = new Date();
    selectedCustomerId: any;

    selectedVaccine: UntypedFormGroup;


    constructor(
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<any>,
        private _customerService: CustomerService,
        private _appointmentService: AppointmentService,
        private _productdescriptionService: ProductDescriptionService,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.selectedCustomerId = data;
    }

    ngOnInit() {
        this.appointmentsList = appointments;

        this.getCustomerList();
        this.getApponitmentDoctorList();
        this.getProductList();

        this.appointmentAdd = this._formBuilder.group({
            doctorId: ['00000000-0000-0000-0000-000000000000'],
            appointmentType: [2, Validators.required],
            customerId: [''],
            note: [''],
        });

        this.selectedVaccine = this._formBuilder.group({
            productId: ['00000000-0000-0000-0000-000000000000'],
            date: [''],
            isComplated: [false]
        });
        


        const newId = uuidv4();
        const model: addVaccineDto = {
            id: newId,
            date: this.now,
            isComplated: false,
            productId: '00000000-0000-0000-0000-000000000000',
        };
        this.addVaccineList.push(model);
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
            debugger;
            this.customers = response.data;
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
        debugger;

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
                        this.getFormValueByName('doctorId'),
                        this.selectedCustomerId.customerId,
                        this.getFormValueByName('note'),
                        this.getFormValueByName('appointmentType')
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
            })

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

    handleValueChangeList(event: any, selectedId : any) {

        let selected = this.addVaccineList.find((x) => x.id == selectedId);

        if(selected){
            selected.date = event.value;
            //selected.productId = productId;
        }


    }

    handleValueChange(e) {
        this.lastSelectedValue = e.value; // Son seçilen değeri saklıyoruz
        console.log('Yeni tarih ve saat: ', this.lastSelectedValue);
        // Yeni değeri kullanmak için burada işlemler yapabilirsiniz
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
