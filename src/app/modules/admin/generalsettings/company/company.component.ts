import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector       : 'settings-company',
    templateUrl    : './company.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsCompanyComponent implements OnInit
{
    accountForm: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.accountForm = this._formBuilder.group({
            name    : ['Brian Hughes'],
            username: ['brianh'],
            title   : ['Senior Frontend Developer'],
            company : ['YXZ Software'],
            about   : ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
            email   : ['hughes.brian@mail.com', Validators.email],
            phone   : ['121-490-33-12'],
            country : ['usa'],
            language: ['english'],
            communication: [true],
            security     : [true],
            meetups      : [false],
            comments     : [false],
            mention      : [true],
            follow       : [true],
            inquiry      : [true]
        });
    }
}
