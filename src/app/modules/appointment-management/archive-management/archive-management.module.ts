import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ArchiveManagementComponent } from './archive-management.component';

@NgModule({
    declarations: [
        ArchiveManagementComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: ArchiveManagementComponent }]),
        SharedModule
    ]
})
export class ArchiveManagementModule { }
