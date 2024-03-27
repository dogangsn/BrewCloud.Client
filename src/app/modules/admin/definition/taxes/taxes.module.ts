import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesComponent } from './taxes.component';
import { Route } from '@angular/router';

const root: Route[] = [
  {
      path     : '',
      component: TaxesComponent
  }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TaxesComponent]
})
export class TaxesModule { }
