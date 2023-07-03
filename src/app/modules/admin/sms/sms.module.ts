import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SmsComponent } from './sms.component';

const root: Route[] = [
    {
        path     : '',
        component: SmsComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        SmsComponent
    ]
    
})
export class SmsModule
{
}