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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { CustomerDetailEditDialogComponent } from '../customerdetails/customer-detail-edit-dialog/customer-detail-edit-dialog.component';
import { CreateEditCustomersalesComponent } from '../customerdetails/create-edit-customersales/create-edit-customersales.component';
import { CreateEditDetailspatientsComponent } from '../customerdetails/create-edit-detailspatients/create-edit-detailspatients.component';
import { AppointmentHistoryComponent } from '../customerdetails/appointment-history/appointment-history.component';
import { GetColectionEditDialogComponent } from '../customerdetails/collection/get-collection-editdialog/get-collection-editdialog.component';
import { ColectionTransactionsDialogComponent } from '../customerdetails/collection/collection-transactions-dialog/collection-transactions-dialog.component';
import { PayChartComponent } from '../customerdetails/pay-chart/pay-chart.component';
import { VaccinationCard } from '../customerdetails/vaccinationcard/vaccinationcard.component';

const root: Route[] = [
    {
        path     : '',
        component: CustomersListComponent
    },
    {
        path: 'customerdetails/:id', 
        component: CustomerDetailsComponent,
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
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
        MatStepperModule,
        RouterModule.forChild(root),
    ],
    declarations: [
        CustomersListComponent,
        CreateEditCustomerAddDialogComponent,
        CreateEditPatientsDialogComponent,
        CustomerDetailsComponent,
        CustomerDetailEditDialogComponent,
        CreateEditCustomersalesComponent,
        CreateEditDetailspatientsComponent,
        AppointmentHistoryComponent,
        GetColectionEditDialogComponent,
        ColectionTransactionsDialogComponent,
        PayChartComponent,
        VaccinationCard
    ]

    
})
export class CustomerListModule
{
}