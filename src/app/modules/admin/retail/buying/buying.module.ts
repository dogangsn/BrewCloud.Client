import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BuyingComponent } from './buying.component';

const root: Route[] = [
    {
        path     : '',
        component: BuyingComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        BuyingComponent
    ]
    
})
export class BuyingModule
{
}