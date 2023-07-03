import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SmsparametersComponent } from './smsparameters.component';
const root: Route[] = [
    {
        path     : '',
        component: SmsparametersComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        SmsparametersComponent
    ]
    
})
export class SmsparametersModule
{
}