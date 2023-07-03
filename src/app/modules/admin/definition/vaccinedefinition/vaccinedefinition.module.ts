import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VaccinedefinitionComponent } from './vaccinedefinition.component';

const root: Route[] = [
    {
        path     : '',
        component: VaccinedefinitionComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        VaccinedefinitionComponent
    ]
    
})
export class VaccinedefinitionModule
{
}