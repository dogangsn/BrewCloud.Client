import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDetailDto } from '../models/CustomerDetailDto';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailEditDialogComponent } from './customer-detail-edit-dialog/customer-detail-edit-dialog.component';
import { PatientDetailsDto } from '../models/PatientDetailsDto';
import { CreateEditCustomersalesComponent } from './create-edit-customersales/create-edit-customersales.component';

@Component({
    selector: 'customerdetails',
    templateUrl: './customerdetails.component.html',
    styleUrls: ['./customerdetails.component.css']
})
export class CustomerDetailsComponent implements OnInit {
    @Output() formDataChanged = new EventEmitter<any>();
    userFirstName: string = "John"; // Kullanıcı adınızı buraya yerine koyun
    userLastName: string = "Doe"; // Kullanıcı soyadınızı buraya yerine koyun
    customerDetailForm: FormGroup;
    selectedCustomerId: any;
    boards: any[];
    id: string;
    customerDetail: CustomerDetailDto
    patientDetails: PatientDetailsDto[] = [];
    firstname: string
    lastname: string
    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: UntypedFormBuilder,
        private _customerService: CustomerService,
        private _translocoService: TranslocoService,
        private _dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.selectedCustomerId = params['id'];
            console.log('Müşteri ID:', this.selectedCustomerId);
        });

        var model = {
            id: this.selectedCustomerId
        }

        this._customerService.getCustomersFindById(model).subscribe(response => {
            if (response.isSuccessful) {
                this.customerDetail = response.data;
                this.patientDetails = this.customerDetail.patientDetails
                this.firstname = this.customerDetail.firstname;
                this.lastname = this.customerDetail.lastname;
                this.customerDetailForm.patchValue({
                    email: this.customerDetail.email,
                    phonenumber: this.customerDetail.phonenumber,
                    phonenumber2: this.customerDetail.phonenumber2,
                    city: this.customerDetail.city,
                    district: this.customerDetail.district,
                    taxoffice: this.customerDetail.taxoffice,
                    vkntcno: this.customerDetail.vkntcno,
                    note: this.customerDetail.note,
                    smsNotification: this.customerDetail.isphone,
                    emailNotification: this.customerDetail.isemail,
                    address: this.customerDetail.longadress,
                    customerdiscount: this.customerDetail.discountrate,
                    customerGroup: this.customerDetail.customergroup,
                    recordDate: this.customerDetail.createdate,
                });
            }
            else {
                this.showSweetAlert('error');
            }
        });

        this.customerDetailForm = this._formBuilder.group({
            email: [{ value: '', disabled: true }],
            phonenumber: [{ value: '', disabled: true }],
            phonenumber2: [{ value: '', disabled: true }],
            city: [{ value: '', disabled: true }],
            district: [{ value: '', disabled: true }],
            taxoffice: [{ value: '', disabled: true }],
            vkntcno: [{ value: '', disabled: true }],
            note: [{ value: '', disabled: true }],
            smsNotification: [{ value: '', disabled: true }],
            emailNotification: [{ value: '', disabled: true }],
            address: [{ value: '', disabled: true }],
            customerdiscount: [{ value: '', disabled: true }],
            customerGroup: [{ value: '', disabled: true }],
            recordDate: [{ value: '', disabled: true }],
        });
    }

    // getUserAvatarUrl(): string {
    //     const initials = this.userFirstName.charAt(0) + this.userLastName.charAt(0);
    //     // Eğer bir API'den veya başka bir kaynaktan fotoğraf URL'sini almanız gerekiyorsa, burada yapabilirsiniz.
    //     // Örneğin: return 'https://example.com/api/getUserAvatar?initials=' + initials;
    
    //     // Eğer fotoğrafları lokal olarak saklıyorsanız, assets klasörü içinde uygun bir yere koyabilir ve buradan kullanabilirsiniz.
    //     return `assets/avatars/${initials}.png`; // Örnek: assets/avatars/JD.png
    //   }

    addPanelOpen(): void {

        const model = {
            customerId: this.selectedCustomerId,
            firstname : this.customerDetail.firstname,
            lastname : this.customerDetail.lastname,
            customerDetailForm: this.customerDetailForm.value
        }

        const dialog = this._dialog
            .open(CustomerDetailEditDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: model
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    // this.getCustomerList();
                }
            });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
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


    openSaleCustomers() : void {

        const model = {
            customerId: this.selectedCustomerId,
        }
        console.log(model);
        const dialog = this._dialog
        .open(CreateEditCustomersalesComponent, {
            maxWidth: '100vw !important',
            disableClose: true,
            data: model
        })
        .afterClosed()
        .subscribe((response) => {
            if (response.status) {
                // this.getCustomerList();
            }
        });
    }




}
