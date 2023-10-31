import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'customerdetails',
    // styleUrls: ['./customerdetails.css'],
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
    customerDetailForm: FormGroup;
    boards: any[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    id: string;
    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const customerId = params['id'];
            console.log('Müşteri ID:', customerId);
        });

        this.customerDetailForm = this._formBuilder.group({
            email: [{ value: 'sefauzunogluu@gmail.com', disabled: true }],
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
}
