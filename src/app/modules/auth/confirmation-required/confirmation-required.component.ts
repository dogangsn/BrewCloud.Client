import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoService } from '@ngneat/transloco';
import { AccountService } from 'app/core/services/account/account.service';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';

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
        private _router: Router,
        private _translocoService: TranslocoService,
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
                if(response.isSuccessful)
                {
                    localStorage.removeItem('email');
                    this._router.navigateByUrl('auth/sign-in');

                }else {
                    this.showSweetAlert('error', "Aktivasyon Kodu yanlış...");
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }



    getFormValueByName(formName: string): any {
        return this.confirmation.get(formName).value;
    }

    
    showSweetAlert(type: string, text: string): void {
        if (type === 'success') {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.success'),
                text,
                SweetalertType.success
            );
            GeneralService.sweetAlert(sweetAlertDto);
        } else {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.error'),
                text,
                SweetalertType.error
            );
            GeneralService.sweetAlert(sweetAlertDto);
        }
    }

    translate(key: string): any {
        return this._translocoService.translate(key);
    }

}
