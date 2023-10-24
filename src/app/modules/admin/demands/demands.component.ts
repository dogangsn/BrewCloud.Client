import { Component, OnInit } from '@angular/core';
import { CreateDemandProductsCommand } from './models/CreateDemandProductsCommand';
import { Demand1Component } from './demand1/demand1.component';
import { ChangeDetectorRef } from '@angular/core';
import { DemandProductsService } from 'app/core/services/Demands/DemandProducts/demandproducts.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder } from '@angular/forms';
@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.css']
})
export class DemandsComponent implements OnInit {
  CreateDemandCom = CreateDemandProductsCommand;
  demandFunc: Demand1Component;

  constructor(
    private demandProductsService: DemandProductsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    // Demand1Component'ı oluştururken gereken argümanları sağlayın
    this.demandFunc = new Demand1Component(
      this.demandProductsService,
      this._changeDetectorRef,
      this._fuseConfirmationService,
      this._formBuilder,
      this.cdr
    );
  }

  ngOnInit() {
  }

  addTalep(): void {
    debugger;
    this.demandFunc.createProduct();
  }
}
