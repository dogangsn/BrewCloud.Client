import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'customerdetails',
    templateUrl: './customerdetails.component.html',
})
export class CustomerDetailsComponent implements OnInit {
    chartVisitors: ApexOptions;
    chartConversions: ApexOptions;
    chartImpressions: ApexOptions;
    chartVisits: ApexOptions;
    chartVisitorsVsPageViews: ApexOptions;
    chartNewVsReturning: ApexOptions;
    chartGender: ApexOptions;
    chartAge: ApexOptions;
    chartLanguage: ApexOptions;
    data: any;
    customerDetailForm: FormGroup
    boards: any[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    id: string;
    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: UntypedFormBuilder,
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const customerId = params['id'];
            console.log('Müşteri ID:', customerId);
        });

        this.customerDetailForm = this._formBuilder.group({
            // email: [''],
            // telNo: [''],
            // telNo2: [''],
            // sehir: [''],
            // ilce: [''],


            firstName: [''],
            lastName: [''],
            phoneNumber: [''],
            phoneNumber2: [''],
            eMail: [''],
            taxOffice: [''],
            vKNTCNo: [''],
            note: [''],
            discountRate: [0],
            isEmail: false,
            isPhone: false,
            province: [''],
            district: [''],
            longAdress: [''],
        });
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
