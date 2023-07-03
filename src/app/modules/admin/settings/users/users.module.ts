import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';

const root: Route[] = [
    {
        path     : '',
        component: UsersComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        UsersComponent
    ]
    
})
export class UsersModule
{
}