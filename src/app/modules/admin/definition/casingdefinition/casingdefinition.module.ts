import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CasingdefinitionComponent } from './casingdefinition.component';


const root: Route[] = [
    {
        path     : '',
        component: CasingdefinitionComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        CasingdefinitionComponent
    ]
    
})
export class CasingdefinitionModule
{
}