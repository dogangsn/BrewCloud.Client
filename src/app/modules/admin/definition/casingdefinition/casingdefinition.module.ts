import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasingdefinitionComponent } from './casingdefinition.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FuseCardModule } from '@fuse/components/card';
import { MatTableModule } from '@angular/material/table';
import { Routes } from "@angular/router";


// const root: Route[] = [
//     {
//         path     : '',
//         component: CasingdefinitionComponent
//     }
// ];
const routes: Routes = [
    {
        path: 'app-casingdefinition',
        loadChildren: () =>
            import(
                'app/modules/admin/definition/casingdefinition/casingdefinition.module'  
            ).then((m) => m.CasingdefinitionModule),
    },
]
@NgModule({

    imports     : [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        FuseCardModule,
        MatMenuModule,
        FormsModule,
        MatTableModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CasingdefinitionComponent
    ]
    
})
export class CasingdefinitionModule
{
}