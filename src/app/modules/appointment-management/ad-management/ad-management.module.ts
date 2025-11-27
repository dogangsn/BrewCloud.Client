import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AdManagementComponent } from './ad-management.component';

@NgModule({
    declarations: [
        AdManagementComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: AdManagementComponent }]),
        SharedModule
    ]
})
export class AdManagementModule { }
