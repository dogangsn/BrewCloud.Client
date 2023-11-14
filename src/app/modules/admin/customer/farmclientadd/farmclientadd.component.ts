import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-farmclientadd',
    templateUrl: './farmclientadd.component.html',
    styleUrls: ['./farmclientadd.component.css'],
})
export class FarmclientaddComponent implements OnInit {
    horizontalStepperForm: UntypedFormGroup;

    constructor(private _formBuilder: UntypedFormBuilder) {}

    ngOnInit() {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                farmName : ['', [Validators.required]],
                farmContact : ['', Validators.required],
                farmRelationship : ['',Validators.required],
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', Validators.required],
                phoneNumber: [''],
                note: [''],
            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });
    }


    formatPhoneNumber(inputValue: string, formControlName: string): void {
        // Sadece sayıları alarak filtreleme yapın
        const numericValue = inputValue.replace(/\D/g, '');

        // Sayıları uygun formatta düzenle
        let formattedValue = '';
        if (numericValue.length > 0) {
            formattedValue += '(' + numericValue.substring(0, 3) + ')';
        }
        if (numericValue.length > 3) {
            formattedValue += ' ' + numericValue.substring(3, 6);
        }
        if (numericValue.length > 6) {
            formattedValue += '-' + numericValue.substring(6, 10);
        }

        // Düzenlenmiş değeri input alanına atayın
        this.horizontalStepperForm.get(formControlName).setValue(formattedValue);
    }

    
}
