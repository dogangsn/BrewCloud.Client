import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { DemoUtilsModule } from './demo-utils/module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const root: Route[] = [
    {
        path     : '',
        component: AppointmentComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        RouterModule.forChild(root),
        FormsModule,
        ReactiveFormsModule,
        FuseCardModule,
        MatMenuModule,
        FormsModule,
        MatTableModule,
        FullCalendarModule,
        CommonModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
          DemoUtilsModule,
    ],
    declarations: [
        AppointmentComponent
    ]
    
})
export class AppointmentModule
{
}
