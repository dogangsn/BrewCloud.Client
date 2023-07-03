import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AccountService } from 'app/core/services/account/account.service';
import { AuthService } from 'app/core/services/auth/auth.service';


@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _accountService : AccountService
    )
    {
    }

    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                username  : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                phone     : ['', Validators.required],
                password  : ['', Validators.required],
                company   : [''],
                campaigncode: ['', Validators.requiredTrue],
                agreements: ['', Validators.required]
            }
        );
    }

    signUp(): void
    {
        debugger;
        var model = {
            email : this.getFormValueByName("email"),
            company : this.getFormValueByName("company"),
            username : this.getFormValueByName("username"),
            Password : this.getFormValueByName("password"),
            Phone: this.getFormValueByName("phone"),
            host: window.location.host,
        }
        this.signUpForm.disable();
        this.showAlert = false;

        this._accountService.createaccount(model)
            .subscribe(
                (response) => {
                    localStorage.setItem('email', model.email);
                    this._router.navigateByUrl('auth/confirmation-required');
                },
                (response) => {
                    this.signUpForm.enable();
                    this.signUpNgForm.resetForm();
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.'
                    };
                    this.showAlert = true;
                }
            );
    }

    getFormValueByName(formName: string): any {
        return this.signUpForm.get(formName).value;
    }
}
