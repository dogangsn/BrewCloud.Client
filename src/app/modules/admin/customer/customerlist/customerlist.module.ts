import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customerlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

const root: Route[] = [
    {
        path     : '',
        component: CustomersListComponent
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
        FormsModule,
        MatTableModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        CustomersListComponent
    ]
    
})
export class CustomerListModule
{
}