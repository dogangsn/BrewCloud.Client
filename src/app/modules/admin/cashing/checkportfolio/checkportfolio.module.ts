import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CheckportfolioComponent } from './checkportfolio.component';

const root: Route[] = [
    {
        path     : '',
        component: CheckportfolioComponent
    }
];

@NgModule({

    imports     : [
        FormsModule,
        RouterModule.forChild(root)
    ],
    declarations: [
        CheckportfolioComponent
    ]
    
})
export class CheckportfolioModule
{
}