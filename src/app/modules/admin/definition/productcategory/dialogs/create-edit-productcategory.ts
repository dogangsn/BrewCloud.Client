import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductCategoriesListDto } from '../models/ProductCategoriesListDto';
import { CreateProductCategoriesCommand } from '../models/CreateProductCategoriesCommand';
import { ProductCategoryService } from 'app/core/services/definition/ProductCategories/productcategory.service';

@Component({
    selector: 'app-create-edit-productcategory-dialog',
    styleUrls: ['./create-edit-productcategory.scss'],
    templateUrl: './create-edit-productcategory.html',
})
export class CreateEditProductCategoriesDialogComponent implements OnInit {
    selectedproductcategory: ProductCategoriesListDto;
    productcategory: FormGroup;



    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _productcategory: ProductCategoryService,
    ) {}

    ngOnInit(): void {
        this.productcategory = this._formBuilder.group({
            name: [''],
            categoryCode: ['']
        });
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addproductcategories(): void {
        const productCategoryItem = new CreateProductCategoriesCommand( 
            this.getFormValueByName('name'),
            this.getFormValueByName('categoryCode')
        );

        this._productcategory.createProductCategory(productCategoryItem).subscribe(
            (response) => {
                if (response.isSuccessful) {
                    // this.showSweetAlert('success');
                    this._dialogRef.close({
                        status: true,
                    });
                } else {
                    // this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );

    }

    getFormValueByName(formName: string): any {
        return this.productcategory.get(formName).value;
    }
}
