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
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectFilterModule } from 'mat-select-filter';
import { CreateEditCustomerAddDialogComponent } from './dialogs/create-edit-customeradd';
import { CreateEditPatientsDialogComponent } from './patientsdialogs/create-edit-patients';
import { CustomerDetailsComponent } from '../customerdetails/customerdetails.component';

const root: Route[] = [
    {
        path     : '',
        component: CustomersListComponent
    },
    {
        path: './customerdetails/:id',
        component: CustomerDetailsComponent, // Müşteri detayları için rotayı tanımla
    },
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
        CustomersListComponent,
        CreateEditCustomerAddDialogComponent,
        CreateEditPatientsDialogComponent
    ]

    
})
export class CustomerListModule
{
}