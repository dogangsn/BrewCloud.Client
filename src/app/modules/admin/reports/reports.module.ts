import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './reports.component';

const root: Route[] = [
    {
        path     : '',
        component: ReportsComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        ReportsComponent
    ]
    
})
export class ReportsModule
{
}