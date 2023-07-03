import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store.component';

const root: Route[] = [
    {
        path     : '',
        component: StoreComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        StoreComponent
    ]
    
})
export class StoreModule
{
}