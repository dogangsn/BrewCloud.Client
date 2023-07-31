import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductdescriptionComponent } from './productdescription.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { CreateEditProductDescriptionDialogComponent } from './dialogs/create-edit-productdescription';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

const root: Route[] = [
    {
        path     : '',
        component: ProductdescriptionComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
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
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,

        RouterModule.forChild(root)
    ],
    declarations: [
        ProductdescriptionComponent,
        CreateEditProductDescriptionDialogComponent
    ]
    
})
export class ProductdescriptionModule
{
}