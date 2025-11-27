import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PreInterviewsComponent } from './pre-interviews.component';

@NgModule({
    declarations: [
        PreInterviewsComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: PreInterviewsComponent }]),
        SharedModule
    ]
})
export class PreInterviewsModule { }
