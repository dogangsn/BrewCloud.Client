import { Component, OnInit,AfterViewInit, ViewChild  } from '@angular/core';
import { CreateDemandProductsCommand } from './models/CreateDemandProductsCommand';
import { Demand1Component } from './demand1/demand1.component';
import { ChangeDetectorRef } from '@angular/core';
import { DemandProductsService } from 'app/core/services/Demands/DemandProducts/demandproducts.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { MatTabGroup,MatTabChangeEvent } from '@angular/material/tabs';
import {  ChangeDetectionStrategy,    ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styles : [
    /* language=SCSS */
    `
        .inventory-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px 112px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
            }
        }
    `
],
encapsulation  : ViewEncapsulation.None,
changeDetection: ChangeDetectionStrategy.OnPush,
animations     : fuseAnimations
})
export class DemandsComponent implements AfterViewInit {
  @ViewChild(Demand1Component) demand1Component: Demand1Component;
  public indexs : number = 0;
  CreateDemandCom = CreateDemandProductsCommand;
  demandFunc: Demand1Component;
  constructor(
    private demandProductsService: DemandProductsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private cdr: ChangeDetectorRef,
    private _translocoService: TranslocoService,
    private productDescriptionService : ProductDescriptionService
      ) {
    // Demand1Component'ı oluştururken gereken argümanları sağlayın
    this.demandFunc = new Demand1Component(
      this.demandProductsService,
      this._changeDetectorRef,
      this._fuseConfirmationService,
      this._formBuilder,
      this.cdr,
      this._translocoService,
      this.productDescriptionService
    );
  }
  ngOnInit() {
  }
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  buttonLabel: string = 'Sipariş Oluştur';

  
  ngAfterViewInit() {
    this.tabGroup.selectedIndexChange.subscribe((event: MatTabChangeEvent) => {
      this.onTabChange(event);
    });
  }
  

  onTabChange(index: MatTabChangeEvent): void {
    debugger;
     const ix = index.index;
    if (ix === 0) {
      this.buttonLabel = 'Sipariş Oluştur';
      this.indexs = 0;
    } else if (ix === 1) {
      this.buttonLabel = 'Onayla';
      this.indexs = 1;
    } 
    else if(ix === 2)
    {
      this.indexs = 2;
    }
    this._changeDetectorRef.markForCheck();
  }
  addTalep(){
    debugger;
    this.demand1Component.createProduct();
  }
  handleButtonClick() {
    // Butona tıklandığında yapılacak işlemler burada
    if(this.indexs == 0)
    {
      console.log(this.indexs);
      this.demand1Component.addDemand();
    }
    if(this.indexs == 1)
    {
      console.log(this.indexs);
    }
  }
}
