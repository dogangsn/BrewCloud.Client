import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditProductCategoriesDialogComponent } from './dialogs/create-edit-productcategory';
import { ProductCategoryService } from 'app/core/services/definition/ProductCategories/productcategory.service';
import { ProductCategoriesListDto } from './models/ProductCategoriesListDto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-productcategory',
    templateUrl: './productcategory.component.html',
    styleUrls: ['./productcategory.component.css'],
})
export class ProductcategoryComponent implements OnInit {
    displayedColumns: string[] = [ 'name', 'categoryCode', 'update', 'delete'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    productcategories: ProductCategoriesListDto[] = [];
    dataSource = new MatTableDataSource<ProductCategoriesListDto>(
        this.productcategories
    );
    
    isUpdateButtonActive: boolean;

    constructor(private _dialog: MatDialog,private _productcategoryservice: ProductCategoryService) {}

    ngOnInit() {
        this.ProductCategoryList();
    }

    ProductCategoryList() {
        this._productcategoryservice
            .getProductCategoryList()
            .subscribe((response) => {
                this.productcategories = response.data;
                console.log(this.productcategories);
            });
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        this.isUpdateButtonActive = false;
        const dialog = this._dialog
            .open(CreateEditProductCategoriesDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    this.ProductCategoryList();
                }
            });
    }

    editProductCategories(model: ProductCategoriesListDto): void {
        this.isUpdateButtonActive = true;

        // this._productcategoryservice.getDeviceInfoId(model).subscribe((response) => {
        //     if (response.isSuccessful) {
        //         this.selectedPdksDeviceInfo = response.data;
        //         const dialog = this._dialog.open(CreateEditPdksDeviceInfoDialogComponent, {
        //             maxWidth: '100vw !important',
        //             disableClose: true,
        //             data: this.selectedPdksDeviceInfo
        //         }).afterClosed().subscribe((err) => {
        //             if (err.status) {
        //                 this.getPdksDeviceInfos();
        //             }
        //         });

        //     } else {
        //         //başarısız
        //     }
        // });
    }

    public redirectToUpdate = (id: string) => {

    }

    public redirectToDelete = (id: string) => {
      
    }



}
