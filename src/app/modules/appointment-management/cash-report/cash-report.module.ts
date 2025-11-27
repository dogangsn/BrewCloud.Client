import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CashReportComponent } from './cash-report.component';

@NgModule({
    declarations: [
        CashReportComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: CashReportComponent }]),
        SharedModule
    ]
})
export class CashReportModule { }
