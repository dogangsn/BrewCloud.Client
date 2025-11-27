import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { StockManagementComponent } from './stock-management.component';

@NgModule({
    declarations: [
        StockManagementComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: StockManagementComponent }]),
        SharedModule
    ]
})
export class StockManagementModule { }
