import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SmsManagementComponent } from './sms-management.component';

@NgModule({
    declarations: [
        SmsManagementComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: SmsManagementComponent }]),
        SharedModule
    ]
})
export class SmsManagementModule { }
