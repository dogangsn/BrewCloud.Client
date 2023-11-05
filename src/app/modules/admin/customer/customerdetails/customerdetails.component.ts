import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'customerdetails',
    // styleUrls: ['./customerdetails.css'],
    templateUrl: './customerdetails.component.html',
})
export class CustomerDetailsComponent implements OnInit {
    // chartVisitors: ApexOptions;
    // chartConversions: ApexOptions;
    // chartImpressions: ApexOptions;
    // chartVisits: ApexOptions;
    // chartVisitorsVsPageViews: ApexOptions;
    // chartNewVsReturning: ApexOptions;
    // chartGender: ApexOptions;
    // chartAge: ApexOptions;
    // chartLanguage: ApexOptions;
    // data: any;
    // private _unsubscribeAll: Subject<any> = new Subject<any>();

    customerDetailForm: FormGroup;
    selectedCustomerId: any;
    boards: any[];
    id: string;
    customerDetail: CustomerDetailDto
    firstname: string
    lastname: string
    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: UntypedFormBuilder,
        private _customerService: CustomerService,
        private _translocoService: TranslocoService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.selectedCustomerId = params['id'];
            console.log('Müşteri ID:', this.selectedCustomerId);
        });

        var model = {
            id : this.selectedCustomerId
        }

        this._customerService.getCustomersFindById(model).subscribe(response => {
            if (response.isSuccessful) {
                this.customerDetail = response.data;
                this.firstname = this.customerDetail.firstname;
                this.lastname = this.customerDetail.lastname;
                this.customerDetailForm.patchValue({
                    email: this.customerDetail.email,
                    telNo: this.customerDetail.phonenumber,
                    telNo2: this.customerDetail.phonenumber2,
                    city: 'this.customerDetail.city',
                    district: 'this.customerDetail.district',
                    taxAdministration: 'this.customerDetail.taxAdministration',
                    vnOrTcNo: this.customerDetail.vkntcno,
                    note: this.customerDetail.note,
                    smsNotification: this.customerDetail.isphone,
                    emailNotification: this.customerDetail.isemail,
                    address: this.customerDetail.adressid,
                    customerdiscount: this.customerDetail.discountrate,
                    customerGroup: this.customerDetail.customergroup,
                    recordDate: this.customerDetail.createdate,
                });
            }
            else{
                this.showSweetAlert('error');
            }
        });

        this.customerDetailForm = this._formBuilder.group({
            email: [{ value: 'asdasd', disabled: true }],
            telNo: [{ value: '0544 574 53 06', disabled: true }],
            telNo2: [{ value: '0544 574 53 06', disabled: true }],
            city: [{ value: 'Antalya', disabled: true }],
            district: [{ value: 'Muratpaşa', disabled: true }],
            taxAdministration: [{ value: 'Muratpaşa Vergi Dairesi', disabled: true }],
            vnOrTcNo: [{ value: '33333333333', disabled: true }],
            note: [{ value: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, illum!', disabled: true }],
            smsNotification: [{ value: 'Pasif', disabled: true }],
            emailNotification: [{ value: 'Pasif', disabled: true }],
            address: [{ value: 'Güzeloba Mah. 3131. Sokak', disabled: true}],
            customerdiscount: [{ value: '25 %', disabled: true}],
            customerGroup: [{ value: '', disabled: true}],
            recordDate: [{ value: '19/11/2023', disabled: true}],
        });
    }

    redirectToDetail(){
        
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
}
