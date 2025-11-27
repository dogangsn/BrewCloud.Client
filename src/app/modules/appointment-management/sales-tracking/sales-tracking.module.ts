import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SalesTrackingComponent } from './sales-tracking.component';

@NgModule({
    declarations: [
        SalesTrackingComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: SalesTrackingComponent }]),
        SharedModule
    ]
})
export class SalesTrackingModule { }
