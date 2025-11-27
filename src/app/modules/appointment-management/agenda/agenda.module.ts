import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AgendaComponent } from './agenda.component';

@NgModule({
    declarations: [
        AgendaComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: AgendaComponent }]),
        SharedModule
    ]
})
export class AgendaModule { }
