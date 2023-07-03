import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductcategoryComponent } from './productcategory.component';


const root: Route[] = [
    {
        path     : '',
        component: ProductcategoryComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        ProductcategoryComponent
    ]
    
})
export class ProductcategoryModule
{
}