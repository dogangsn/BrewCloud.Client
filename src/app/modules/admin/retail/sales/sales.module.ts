import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesComponent } from './sales.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { CreateEditSalesBuyComponent } from '../create-edit-sales/create-edit-salesbuy.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectFilterModule } from 'mat-select-filter';
import { CreateEditBuyOrderComponent } from '../create-edit-buying-order/create-edit-buying-order.component';

const root: Route[] = [
    {
        path     : '',
        component: SalesComponent
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
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        FuseCardModule,
        MatMenuModule,
        MatSelectModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        MatDialogModule,
        MatDatepickerModule, 
        MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
        MatSelectFilterModule ,
        RouterModule.forChild(root)
    ],
    declarations: [
        SalesComponent,
        CreateEditSalesBuyComponent,
        CreateEditBuyOrderComponent
    ]
    
})
export class SalesModule
{
}