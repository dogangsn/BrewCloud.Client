import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment.component';

const root: Route[] = [
    {
        path     : '',
        component: AppointmentComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        AppointmentComponent
    ]
    
})
export class AppointmentModule
{
}