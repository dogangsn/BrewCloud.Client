import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import {
    FormGroup,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { CreateCustomerCommand } from './models/CreateCustomerCommand';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
    Observable,
    Subject,
    debounceTime,
    map,
    merge,
    switchMap,
    takeUntil,
} from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {
    InventoryBrand,
    InventoryCategory,
    InventoryPagination,
    InventoryProduct,
    InventoryTag,
    InventoryVendor,
} from './models/inventory.types';
import { InventoryService } from './inventory.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { fuseAnimations } from '@fuse/animations';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'customeradd',
    templateUrl: './customeradd.component.html',
    styles: [
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
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class CustomeraddComponent implements OnInit, AfterViewInit, OnDestroy {
    customers: CreateCustomerCommand[] = [];
    accountForm: FormGroup;

    //
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    products: InventoryProduct[];
    brands: InventoryBrand[];
    categories: InventoryCategory[];
    filteredTags: InventoryTag[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: InventoryProduct | null = null;
    selectedProductForm: UntypedFormGroup;
    tags: InventoryTag[];
    tagsEditMode: boolean = false;
    vendors: InventoryVendor[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    //

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _customerService: CustomerService,
        private _translocoService: TranslocoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _inventoryService: InventoryService
    ) {}

    ngOnInit() {
        this.accountForm = this._formBuilder.group({
            firstName: [''],
            lastName: [''],
            phoneNumber: [''],
            phoneNumber2: [''],
            eMail: [''],
            taxOffice: [''],
            vKNTCNo: [''],
            note: [''],
            discountRate: [0],
            isEmail: false,
            isPhone: false,
            province: [''],
            district: [''],
            longAdress: [''],
        });

        //
        this.selectedProductForm = this._formBuilder.group({
            id: [''],
            category: [''],
            name: ['', [Validators.required]],
            description: [''],
            tags: [[]],
            sku: [''],
            barcode: [''],
            brand: [''],
            vendor: [''],
            stock: [''],
            reserved: [''],
            cost: [''],
            basePrice: [''],
            taxPercent: [''],
            price: [''],
            weight: [''],
            thumbnail: [''],
            images: [[]],
            currentImageIndex: [0], // Image index that is currently being viewed
            active: [false],
        });

        // Get the brands
        this.brands = brands;

        // Get the categories
        this.categories = categories;

        // Get the products
        this.products = products;

        // Get the tags
        this.tags = tags;

        // Get the vendors
        this.vendors = vendors;

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._inventoryService.getProducts(
                        0,
                        10,
                        'name',
                        'asc',
                        query
                    );
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
        //

        // this.fillFormData(this.selectedErpDepotCard);
    }

    // fillFormData(selectedErpDepotCard: CreateCustomerCommand) {
    //   if (this.selectedErpDepotCard !== null) {
    //       this.erpdepotcardForm.setValue({
    //           depotcode: selectedErpDepotCard.depotCode,
    //           revenuename: selectedErpDepotCard.revenuename,
    //           depottype: selectedErpDepotCard.depotType,
    //           accDepartmentId: selectedErpDepotCard.accDepartmentId,
    //           passive : selectedErpDepotCard.passive,
    //           passivedate: selectedErpDepotCard.passiveDate
    //       });
    //   }

    getFormValueByName(formName: string): any {
        return this.accountForm.get(formName).value;
    }

    addCustomers(): any {
        const customerItem = new CreateCustomerCommand(
            this.getFormValueByName('firstName'),
            this.getFormValueByName('lastName'),
            this.getFormValueByName('phoneNumber'),
            this.getFormValueByName('phoneNumber2'),
            this.getFormValueByName('eMail'),
            this.getFormValueByName('taxOffice'),
            this.getFormValueByName('vKNTCNo'),
            this.getFormValueByName('note'),
            0,
            this.getFormValueByName('province'),
            this.getFormValueByName('district'),
            this.getFormValueByName('longAdress')
        );
        this._customerService.createCustomers(customerItem).subscribe(
            (response) => {
                if (response.isSuccessful) {
                    // this.showSweetAlert('success');
                    // this._dialogRef.close({
                    //     status: true,
                    // });
                } else {
                    // this.showSweetAlert('error');
                }
            },
            (err) => {
                console.log(err);
            }
        );
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

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page)
                .pipe(
                    switchMap(() => {
                        this.closeDetails();
                        this.isLoading = true;
                        return this._inventoryService.getProducts(
                            this._paginator.pageIndex,
                            this._paginator.pageSize,
                            this._sort.active,
                            this._sort.direction
                        );
                    }),
                    map(() => {
                        this.isLoading = false;
                    })
                )
                .subscribe();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle product details
     *
     * @param productId
     */
    toggleDetails(productId: string): void {
        // If the product is already selected...
        if (this.selectedProduct && this.selectedProduct.id === productId) {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the product by id
        this._inventoryService
            .getProductById(productId)
            .subscribe((product) => {
                // Set the selected product
                this.selectedProduct = product;

                // Fill the form
                this.selectedProductForm.patchValue(product);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    closeDetails(): void {
        this.selectedProduct = null;
    }

    /**
     * Cycle through images of selected product
     */
    cycleImages(forward: boolean = true): void {
        // Get the image count and current image index
        const count = this.selectedProductForm.get('images').value.length;
        const currentIndex =
            this.selectedProductForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if (forward) {
            this.selectedProductForm
                .get('currentImageIndex')
                .setValue(nextIndex);
        }
        // If cycling backwards...
        else {
            this.selectedProductForm
                .get('currentImageIndex')
                .setValue(prevIndex);
        }
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void {
        this.tagsEditMode = !this.tagsEditMode;
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.tags.filter((tag) =>
            tag.title.toLowerCase().includes(value)
        );
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    filterTagsInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no tag available...
        if (this.filteredTags.length === 0) {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = this.selectedProduct.tags.find(
            (id) => id === tag.id
        );

        // If the found tag is already applied to the product...
        if (isTagApplied) {
            // Remove the tag from the product
            this.removeTagFromProduct(tag);
        } else {
            // Otherwise add the tag to the product
            this.addTagToProduct(tag);
        }
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(title: string): void {
        const tag = {
            title,
        };

        // Create tag on the server
        this._inventoryService.createTag(tag).subscribe((response) => {
            // Add the tag to the product
            this.addTagToProduct(response);
        });
    }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    updateTagTitle(tag: InventoryTag, event): void {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        this._inventoryService
            .updateTag(tag.id, tag)
            .pipe(debounceTime(300))
            .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the tag
     *
     * @param tag
     */
    deleteTag(tag: InventoryTag): void {
        // Delete the tag from the server
        this._inventoryService.deleteTag(tag.id).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add tag to the product
     *
     * @param tag
     */
    addTagToProduct(tag: InventoryTag): void {
        // Add the tag
        this.selectedProduct.tags.unshift(tag.id);

        // Update the selected product form
        this.selectedProductForm
            .get('tags')
            .patchValue(this.selectedProduct.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tag from the product
     *
     * @param tag
     */
    removeTagFromProduct(tag: InventoryTag): void {
        // Remove the tag
        this.selectedProduct.tags.splice(
            this.selectedProduct.tags.findIndex((item) => item === tag.id),
            1
        );

        // Update the selected product form
        this.selectedProductForm
            .get('tags')
            .patchValue(this.selectedProduct.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle product tag
     *
     * @param tag
     * @param change
     */
    toggleProductTag(tag: InventoryTag, change: MatCheckboxChange): void {
        if (change.checked) {
            this.addTagToProduct(tag);
        } else {
            this.removeTagFromProduct(tag);
        }
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean {
        return !!!(
            inputValue === '' ||
            this.tags.findIndex(
                (tag) => tag.title.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }

    /**
     * Create product
     */
    createProduct(): void {
        // Create the product
        this._inventoryService.createProduct().subscribe((newProduct) => {
            // Go to new product
            this.selectedProduct = newProduct;
            this.selectedProductForm.patchValue(newProduct);
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected product using the form data
     */
    updateSelectedProduct(): void {
        // Get the product object
        const product = this.selectedProductForm.getRawValue();

        // Remove the currentImageIndex field
        delete product.currentImageIndex;

        // Update the product on the server
        this._inventoryService
            .updateProduct(product.id, product)
            .subscribe(() => {
                // Show a success message
                this.showFlashMessage('success');
            });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete product',
            message:
                'Are you sure you want to remove this product? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the product object
                const product = this.selectedProductForm.getRawValue();

                // Delete the product on the server
                this._inventoryService
                    .deleteProduct(product.id)
                    .subscribe(() => {
                        // Close the details
                        this.closeDetails();
                    });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}

export const categories = [
    {
        id: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        parentId: null,
        name: 'Mens',
        slug: 'mens',
    },
    {
        id: '07986d93-d4eb-4de1-9448-2538407f7254',
        parentId: null,
        name: 'Ladies',
        slug: 'ladies',
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a638ef02a3e9',
        parentId: null,
        name: 'Unisex',
        slug: 'unisex',
    },
];
export const brands = [
    {
        id: 'e1789f32-9475-43e7-9256-451d2e3a2282',
        name: 'Benton',
        slug: 'benton',
    },
    {
        id: '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        name: 'Capmia',
        slug: 'capmia',
    },
    {
        id: 'f9987124-7ada-4b93-bef7-35280b3ddbd7',
        name: 'Lara',
        slug: 'lara',
    },
    {
        id: '5913ee46-a497-41db-a118-ee506011529f',
        name: 'Premera',
        slug: 'premera',
    },
    {
        id: '2c4d98d8-f334-4125-9596-862515f5526b',
        name: 'Zeon',
        slug: 'zeon',
    },
];
export const tags = [
    {
        id: '167190fa-51b4-45fc-a742-8ce1b33d24ea',
        title: 'mens',
    },
    {
        id: '3baea410-a7d6-4916-b79a-bdce50c37f95',
        title: 'ladies',
    },
    {
        id: '8ec8f60d-552f-4216-9f11-462b95b1d306',
        title: 'unisex',
    },
    {
        id: '8837b93f-388b-43cc-851d-4ca8f23f3a61',
        title: '44mm',
    },
    {
        id: '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
        title: '40mm',
    },
    {
        id: '2300ac48-f268-466a-b765-8b878b6e14a7',
        title: '5 ATM',
    },
    {
        id: '0b11b742-3125-4d75-9a6f-84af7fde1969',
        title: '10 ATM',
    },
    {
        id: '0fc39efd-f640-41f8-95a5-3f1d749df200',
        title: 'automatic',
    },
    {
        id: '7d6dd47e-7472-4f8b-93d4-46c114c44533',
        title: 'chronograph',
    },
    {
        id: 'b1286f3a-e2d0-4237-882b-f0efc0819ec3',
        title: 'watch',
    },
];
export const vendors = [
    {
        id: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        name: 'Evel',
        slug: 'evel',
    },
    {
        id: '998b0c07-abfd-4ba3-8de1-7563ef3c4d57',
        name: 'Mivon',
        slug: 'mivon',
    },
    {
        id: '05ebb527-d733-46a9-acfb-a4e4ec960024',
        name: 'Neogen',
        slug: 'neogen',
    },
];
export const products = [];
