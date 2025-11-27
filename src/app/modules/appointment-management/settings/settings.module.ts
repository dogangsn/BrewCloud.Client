import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: SettingsComponent }]),
        SharedModule
    ]
})
export class SettingsModule { }
