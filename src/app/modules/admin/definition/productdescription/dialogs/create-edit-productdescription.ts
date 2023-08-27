import { Component, OnInit } from '@angular/core';
import { ProductDescriptionsDto } from '../models/ProductDescriptionsDto';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { CreateProductDescriptionsCommand } from '../models/CreateProductDescriptionsCommand';
import { ProductDescriptionService } from 'app/core/services/definition/productdescription/productdescription.service';
import { UpdateProductDescriptionsCommand } from '../models/UpdateProductDescriptionsCommand';
import { CustomerGroupListDto } from '../../customergroup/models/customerGroupListDto';
import { CustomerGroupService } from 'app/core/services/definition/customergroup/customergroup.service';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';
import { unitdefinitionListDto } from '../../unitdefinition/models/unitdefinitionListDto';
import { ProductCategoriesListDto } from '../../productcategory/models/ProductCategoriesListDto';
import { ProductCategoryService } from 'app/core/services/definition/ProductCategories/productcategory.service';
import { SuppliersService } from 'app/core/services/suppliers/suppliers.service';
import { suppliersListDto } from 'app/modules/admin/suppliers/models/suppliersListDto';

@Component({
    selector: 'app-create-edit-productdescription-dialog',
    styleUrls: ['./create-edit-productdescription.scss'],
    templateUrl: './create-edit-productdescription.html',
})
export class CreateEditProductDescriptionDialogComponent implements OnInit {
    selectedProductdescription: ProductDescriptionsDto;
    productdescription: FormGroup;
    units: unitdefinitionListDto[] = [];
    productcategories: ProductCategoriesListDto[] = [];
    supplierscards: suppliersListDto[] = [];
    selectedValue: string;

    constructor(
        private _dialogRef: MatDialogRef<any>,  
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        private _productDefService : ProductDescriptionService,
        private _unitsservice: UnitsService,
        private _productcategoryservice: ProductCategoryService,
        private _suppliersService: SuppliersService,
        ) 
        {

        }

        
    ngOnInit(): void {
        this.UnitsList();
        this.ProductCategoryList();

        this.productdescription = this._formBuilder.group({
            name: ['' , [Validators.required]],
            unitId : [''],
            categoryId : [''],
            productTypeId : [''],
            supplierId: [''],
            productBarcode : [''],
            productCode : [''],
            ratio : [0],
            buyingPrice : [0],
            sellingPrice : [0],
            criticalAmount : [0],
            active: [true],
            sellingIncludeKDV : [false],
            buyingIncludeKDV : [false],
            fixPrice : [false],
            isExpirationDate :[false]
        });

    }

    UnitsList() {
        this._unitsservice.getUnitsList().subscribe((response) => {
            this.units = response.data;
            console.log(this.units);
        });
    }

    ProductCategoryList() {
        this._productcategoryservice
            .getProductCategoryList()
            .subscribe((response) => {
                this.productcategories = response.data;
                console.log(this.productcategories);
            });
    }

    getSuppliers() {
        this._suppliersService.getSuppliersList().subscribe((response) => {
            this.supplierscards = response.data;
            console.log(this.supplierscards);
        });
    }

    fillFormData(selectedproductdesf: ProductDescriptionsDto) {
        debugger;
        if (this.selectedProductdescription !== null) {
            this.productdescription.setValue({
                name: selectedproductdesf.name,
            });
        }
    }

    addOrUpdateProductDef(): void {
        this.selectedProductdescription
            ? this.updateProductDef()
            : this.addProductDef();
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addProductDef(): void {
        const ProductDefItem = new CreateProductDescriptionsCommand( 
            this.getFormValueByName('name'),
            this.getFormValueByName('unitId'),
            this.getFormValueByName('categoryId'),
            this.getFormValueByName('productTypeId'),
            this.getFormValueByName('supplierId'),
            this.getFormValueByName('productBarcode'),
            this.getFormValueByName('productCode'),
            this.getFormValueByName('ratio'),
            this.getFormValueByName('buyingPrice'),
            this.getFormValueByName('sellingPrice'),
            this.getFormValueByName('criticalAmount'),
            this.getFormValueByName('active'),
            this.getFormValueByName('sellingIncludeKDV'),
            this.getFormValueByName('buyingIncludeKDV'),
            this.getFormValueByName('fixPrice'),
            this.getFormValueByName('isExpirationDate'),
            );
            
            this._productDefService.createProductDescription(ProductDefItem).subscribe(
                (response) => {
                    
                    debugger;

                if (response.isSuccessful) {
                    this.showSweetAlert('success');
                    this._dialogRef.close({
                        status: true,
                    });
                } else {
                     this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );

    }

    updateProductDef(){

        const storeItem = new UpdateProductDescriptionsCommand(
            this.selectedProductdescription.id,
            this.getFormValueByName('name'),
            this.getFormValueByName('unitId'),
            this.getFormValueByName('categoryId'),
            this.getFormValueByName('productTypeId'),
            this.getFormValueByName('supplierId'),
            this.getFormValueByName('productBarcode'),
            this.getFormValueByName('productCode'),
            this.getFormValueByName('ratio'),
            this.getFormValueByName('buyingPrice'),
            this.getFormValueByName('sellingPrice'),
            this.getFormValueByName('criticalAmount'),
            this.getFormValueByName('active'),
            this.getFormValueByName('sellingIncludeKDV'),
            this.getFormValueByName('buyingIncludeKDV'),
            this.getFormValueByName('fixPrice'),
            this.getFormValueByName('isExpirationDate'),
        );

        this._productDefService.updateProductDescription(storeItem).subscribe(
            (response) => {
                debugger;

                if (response.isSuccessful) {
                    this.showSweetAlert('success');
                    this._dialogRef.close({
                        status: true,
                    });
                } else {
                    this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );

    }

    getFormValueByName(formName: string): any {
        return this.productdescription.get(formName).value;
    }

    showSweetAlert(type: string): void {
        if (type === 'success') {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.success'),
                this.translate('sweetalert.transactionSuccessful'),
                SweetalertType.success
            );
            GeneralService.sweetAlert(sweetAlertDto);
        } else {
            const sweetAlertDto = new SweetAlertDto(
                this.translate('sweetalert.error'),
                this.translate('sweetalert.transactionFailed'),
                SweetalertType.error
            );
            GeneralService.sweetAlert(sweetAlertDto);
        }
    }

    translate(key: string): any {
        return this._translocoService.translate(key);
    }

}
