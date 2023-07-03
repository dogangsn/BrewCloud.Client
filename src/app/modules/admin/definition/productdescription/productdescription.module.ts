import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductdescriptionComponent } from './productdescription.component';

const root: Route[] = [
    {
        path     : '',
        component: ProductdescriptionComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        ProductdescriptionComponent
    ]
    
})
export class ProductdescriptionModule
{
}