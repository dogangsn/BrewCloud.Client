import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalesDto } from './models/salesDto';
import { fuseAnimations } from '@fuse/animations';
import { v4 as uuidv4 } from 'uuid';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { ProductDescriptionsDto } from 'app/modules/admin/definition/productdescription/models/ProductDescriptionsDto';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { TaxesDto } from 'app/modules/admin/definition/taxes/models/taxesDto';
import { TaxisService } from 'app/core/services/definition/taxis/taxis.service';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { CreateSaleCommand } from './models/CreateSaleCommand';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DDD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DDD MMMM YYYY',
  },
};


@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ],
  animations: fuseAnimations
})
export class SalesDialogComponent implements OnInit {

  displayedColumns: string[] = ['product', 'quantity', 'unitPrice', 'discount', 'vat', 'total', 'actions'];
  dataSource: SalesDto[] = [{ id: uuidv4(), product: '', quantity: 1, unit: 'Adet', unitPrice: 0, discount: 0, vat: 'Yok' }];

  products: ProductDescriptionsDto[] = [];
  taxisList: TaxesDto[] = [];

  selectedsales: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
  formGroup: FormGroup;
  selectedCustomerId: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<any>,
    private _productdescriptionService: ProductDescriptionService,
    private _taxisService: TaxisService,
    private _customerService: CustomerService,
    private _translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedCustomerId = data.customerId;
   }

  ngOnInit() {

    zip(
      this.getTaxisList(),
      this.getProductList()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => {
        this.setTaxis(value[0]),
          this.setProductList(value[1])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        //this.fillFormData(this.selectedProductdescription);
      }
    });


    this.formGroup = this._formBuilder.group({
      date: new FormControl(new Date()),
      remark: ['']
    });

  }


  onProductSelectionChange(element: SalesDto): void {
    const selectedProduct = this.products.find(product => product.id === element.product);
    element.unitPrice = selectedProduct ? selectedProduct.sellingPrice : null;
    element.vat = selectedProduct ? selectedProduct.taxisId : null;
  }

  addRow() {
    const newRow: SalesDto = { id: uuidv4(), product: '', quantity: 1, unit: 'Adet', unitPrice: 0, discount: 0, vat: 'Yok' };
    this.dataSource = [...this.dataSource, newRow];
  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  removeRow(element: SalesDto) {
    this.dataSource = this.dataSource.filter(e => e !== element);
  }

  calculateTotal(element: SalesDto): number {
    const price = element.quantity * element.unitPrice;
    const discount = element.discount || 0;
    const vatRate = element.vat === '8%' ? 0.08 : element.vat === '18%' ? 0.18 : 0;
    return price - discount + price * vatRate;
  }

  calculateSubtotal(): number {
    return this.dataSource.reduce((acc, element) => acc + (element.quantity * element.unitPrice - (element.discount || 0)), 0);
  }

  calculateVat(): number {
    return this.dataSource.reduce((acc, element) => {
      const price = element.quantity * element.unitPrice;
      const vatRate = element.vat === '8%' ? 0.08 : element.vat === '18%' ? 0.18 : 0;
      return acc + (price * vatRate);
    }, 0);
  }

  calculateTotalAmount(): number {
    return this.calculateSubtotal() + this.calculateVat();
  }

  addOrUpdateSales(): void {
    this.selectedsales
      ? this.updateSales()
      : this.addSales();
  }

  getTaxisList(): Observable<any> {
    return this._taxisService.getTaxisList();
  }

  setTaxis(response: any): void {
    if (response.data) {
      this.taxisList = response.data;
    }
  }

  getProductList(): Observable<any> {
    const model = {
      ProductType: 1,
    };
    return this._productdescriptionService.getProductDescriptionFilters(model);
  }

  setProductList(response: any): void {
    this.products = response.data;
  }

  getFormValueByName(formName: string): any {
    return this.formGroup.get(formName).value;
  }

  showSweetAlert(type: string, text: string): void {
    if (type === 'success') {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.success'),
        this.translate(text),
        SweetalertType.success
      );
      GeneralService.sweetAlert(sweetAlertDto);
    } else {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.error'),
        this.translate(text),
        SweetalertType.error
      );
      GeneralService.sweetAlert(sweetAlertDto);
    }
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  addSales(): void {

    const model = new CreateSaleCommand();
    model.trans = this.dataSource;
    model.remark = this.getFormValueByName('remark');
    model.date = this.getFormValueByName('date');
    model.customerId = this.selectedCustomerId;

    this._customerService
      .saleCommand(model)
      .subscribe(
        (response) => { 
          if (response.isSuccessful) {
            this.showSweetAlert(
              'success',
              'sweetalert.transactionSuccessful'
            );
            this._dialogRef.close({
              status: true,
            });
          } else {
            this.showSweetAlert(
              'error',
              'sweetalert.transactionFailed'
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );



  }

  updateSales(): void {

  }


}
