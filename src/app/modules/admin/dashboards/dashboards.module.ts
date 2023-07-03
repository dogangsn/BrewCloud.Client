import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardsComponent } from 'app/modules/admin/dashboards/dashboards.component';
import { CustomerModule } from '../customer/customer.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: DashboardsComponent
    }
];

@NgModule({
    declarations: [
        DashboardsComponent
    ],
    imports     : [
        CustomerModule,
        MatIconModule,
        RouterModule.forChild(exampleRoutes),
        MatButtonModule,
        MatDividerModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        TranslocoModule,
        MatButtonModule,
        //MatSidenavModule,
        // MatSortModule,
        // MatTableModule,
        // MatTabsModule,
        // NgApexchartsModule
    ]
})
export class DashboardsModule
{
}
