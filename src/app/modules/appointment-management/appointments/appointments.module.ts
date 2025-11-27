import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AppointmentsComponent } from './appointments.component';

@NgModule({
    declarations: [
        AppointmentsComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: AppointmentsComponent }]),
        SharedModule
    ]
})
export class AppointmentsModule { }
