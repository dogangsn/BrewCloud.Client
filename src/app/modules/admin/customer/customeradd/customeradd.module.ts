import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomeraddComponent } from './customeradd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';

const root: Route[] = [
    {
        path     : '',
        component: CustomeraddComponent
    }
];

@NgModule({

    imports     : [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        FuseCardModule,
        MatMenuModule,
        RouterModule.forChild(root),
     
    ],
    declarations: [
        CustomeraddComponent
    ]
    
})
export class CustomeraddModule
{
}