import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AccountService } from 'app/core/services/account/account.service';

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationRequiredComponent
{
    confirmation: UntypedFormGroup;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _accountService : AccountService,
        private _router: Router
    )
    {    
    }
    @Input() data: string;

    ngOnInit(): void
    {
        // Create the form
        this.confirmation = this._formBuilder.group({
             activationcode : ['', [Validators.required]],
            }
        );
    }



    sendActivation(): void {
        var model = {
            Email : localStorage.getItem('email'),
            ActivationCode : this.getFormValueByName("activationcode"),
        };
        debugger;
        this._accountService.complateactivation(model)
        .subscribe(
            (response) => {
                localStorage.removeItem('email');
                this._router.navigateByUrl('auth/sign-in');
            },
            (response) => {
                
            }
        );
    }



    getFormValueByName(formName: string): any {
        return this.confirmation.get(formName).value;
    }

    // showSweetAlert(type: string): void {
    //     if (type === 'success') {
    //         const sweetAlertDto = new SweetAlertDto(
    //             this.translate('sweetalert.success'),
    //             this.translate('sweetalert.transactionSuccessful'),
    //             SweetalertType.success);
    //         GlobalService.sweetAlert(sweetAlertDto);
    //     }
    //     else {
    //         const sweetAlertDto = new SweetAlertDto(
    //             this.translate('sweetalert.error'),
    //             this.translate('sweetalert.transactionFailed'),
    //             SweetalertType.error);
    //         GlobalService.sweetAlert(sweetAlertDto);
    //     }
    // }

}
