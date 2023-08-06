import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditProductDescriptionDialogComponent } from './dialogs/create-edit-productdescription';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDescriptionsDto } from './models/ProductDescriptionsDto';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';

@Component({
    selector: 'app-productdescription',
    templateUrl: './productdescription.component.html',
    styleUrls: ['./productdescription.component.css'],
})
export class ProductdescriptionComponent implements OnInit {
    displayedColumns: string[] = [
        'name',
        'productCode',
        'productBarcode',
        'buyingPrice',
        'sellingPrice',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    productdescription: ProductDescriptionsDto[] = [];
    dataSource = new MatTableDataSource<ProductDescriptionsDto>(
        this.productdescription
    );
    private _productdescriptionService : ProductDescriptionService

    constructor(private _dialog: MatDialog) {}

    ngOnInit() {

    }


    getCustomerList() {
      this._productdescriptionService.GetProductDescriptionList().subscribe((response) => {
          this.productdescription = response.data;
          console.log(this.productdescription);
      });
  }



    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        //this.isUpdateButtonActive = false;

        const dialog = this._dialog
            .open(CreateEditProductDescriptionDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    //this.getErpFinanceMonitors();
                }
            });
    }
}
