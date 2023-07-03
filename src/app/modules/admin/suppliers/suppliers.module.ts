import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuppliersComponent } from './suppliers.component';

const root: Route[] = [
    {
        path     : '',
        component: SuppliersComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        SuppliersComponent
    ]
    
})
export class SuppliersModule
{
}