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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';

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
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule
    ]
})
export class DashboardsModule
{
}
