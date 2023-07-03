import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ParametersComponent } from './parameters.component';

const root: Route[] = [
    {
        path     : '',
        component: ParametersComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        ParametersComponent
    ]
    
})
export class ParametersModule
{
}