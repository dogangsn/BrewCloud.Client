import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PackageManagementComponent } from './package-management.component';

@NgModule({
    declarations: [
        PackageManagementComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: PackageManagementComponent }]),
        SharedModule
    ]
})
export class PackageManagementModule { }
