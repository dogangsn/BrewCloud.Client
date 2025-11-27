import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SessionTrackingComponent } from './session-tracking.component';

@NgModule({
    declarations: [
        SessionTrackingComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: SessionTrackingComponent }]),
        SharedModule
    ]
})
export class SessionTrackingModule { }
