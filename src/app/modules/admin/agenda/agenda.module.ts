import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgendaComponent } from './agenda.component';

const root: Route[] = [
    {
        path     : '',
        component: AgendaComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        AgendaComponent
    ]
    
})
export class AgendaModule
{
}