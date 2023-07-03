import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClinicalstatisticsComponent } from './clinicalstatistics.component';

const root: Route[] = [
    {
        path     : '',
        component: ClinicalstatisticsComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        ClinicalstatisticsComponent
    ]
    
})
export class ClinicalstatisticsModule
{
}