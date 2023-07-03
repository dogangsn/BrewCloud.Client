import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalesComponent } from './sales.component';

const root: Route[] = [
    {
        path     : '',
        component: SalesComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        SalesComponent
    ]
    
})
export class SalesModule
{
}