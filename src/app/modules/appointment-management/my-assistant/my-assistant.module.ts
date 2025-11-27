import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MyAssistantComponent } from './my-assistant.component';

@NgModule({
    declarations: [
        MyAssistantComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: MyAssistantComponent }]),
        SharedModule
    ]
})
export class MyAssistantModule { }
