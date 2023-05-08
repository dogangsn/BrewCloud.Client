import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
    
    constructor(
        private _accountService : AccountService,
        private _router: Router
    )
    {    
    }

    sendActivation(): void {

        var model = {
            
        };

        this._accountService.complateactivation(model)
        .subscribe(
            (response) => {
                this._router.navigateByUrl('auth/confirmation-required');
            },
            (response) => {

            }
        );
    }

}
