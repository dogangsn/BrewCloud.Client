import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LabComponent } from './lab.component';

const root: Route[] = [
    {
        path     : '',
        component: LabComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        LabComponent
    ]
    
})
export class LabModule
{
}