import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { DemandsComponent } from './demands.component';
import { Demand1Component } from './demand1/demand1.component';
import { Demand2Component } from './demand2/demand2.component';
import { Demand3Component } from './demand3/demand3.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateDemandProductsCommand } from './models/CreateDemandProductsCommand';
const routes: Routes = [
  {
    path: '',
    component: DemandsComponent
  }
];

@NgModule({
  declarations: [
    DemandsComponent,
    Demand1Component,
    Demand2Component,
    Demand3Component
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FuseCardModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Demands { }
