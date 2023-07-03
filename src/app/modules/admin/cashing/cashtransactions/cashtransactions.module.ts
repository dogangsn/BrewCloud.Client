import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CashtransactionsComponent } from './cashtransactions.component';

const root: Route[] = [
    {
        path     : '',
        component: CashtransactionsComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        CashtransactionsComponent
    ]
    
})
export class CashTransactionsModule
{
}