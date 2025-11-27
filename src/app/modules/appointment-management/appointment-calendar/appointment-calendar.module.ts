import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AppointmentCalendarComponent } from './appointment-calendar.component';

@NgModule({
    declarations: [
        AppointmentCalendarComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: AppointmentCalendarComponent }]),
        SharedModule
    ]
})
export class AppointmentCalendarModule { }
