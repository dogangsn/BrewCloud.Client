import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PromissoryNoteTrackingComponent } from './promissory-note-tracking.component';

@NgModule({
    declarations: [
        PromissoryNoteTrackingComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: PromissoryNoteTrackingComponent }]),
        SharedModule
    ]
})
export class PromissoryNoteTrackingModule { }
