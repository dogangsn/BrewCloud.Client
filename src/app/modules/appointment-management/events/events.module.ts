import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { EventsComponent } from './events.component';

@NgModule({
    declarations: [
        EventsComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: EventsComponent }]),
        SharedModule
    ]
})
export class EventsModule { }
