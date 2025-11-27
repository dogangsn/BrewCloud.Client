import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CustomersComponent } from './customers.component';

@NgModule({
    declarations: [
        CustomersComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: CustomersComponent }]),
        SharedModule
    ]
})
export class CustomersModule { }
