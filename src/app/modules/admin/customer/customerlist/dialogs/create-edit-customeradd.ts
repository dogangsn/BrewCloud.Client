import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';
import { ProductCategoryService } from 'app/core/services/definition/ProductCategories/productcategory.service';
import { SuppliersService } from 'app/core/services/suppliers/suppliers.service';
import { suppliersListDto } from 'app/modules/admin/suppliers/models/suppliersListDto';
import { ProductType } from 'app/modules/bases/enums/producttype.enum';
import { customersListDto } from '../../models/customersListDto';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { CreateCustomerCommand } from '../../models/CreateCustomerCommand';
import { PatientDetails } from '../../models/PatientDetailsCommand';
import { CustomerGroupListDto } from 'app/modules/admin/definition/customergroup/models/customerGroupListDto';
import { CustomerGroupService } from 'app/core/services/definition/customergroup/customergroup.service';
import { CreateEditPatientsDialogComponent } from '../patientsdialogs/create-edit-patients';
import { VeriServisi } from '../service/veri-servisi';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-create-edit-customeradd-dialog',
    styleUrls: ['./create-edit-customeradd.css'],
    templateUrl: './create-edit-customeradd.html',
})
export class CreateEditCustomerAddDialogComponent implements OnInit {
    displayedColumns: string[] = [
        'name'
    ];

    selectedcustomeradd: customersListDto;
    customeradd: FormGroup;
    selectedValue: string;

    customers: CreateCustomerCommand = new CreateCustomerCommand();
    customergroupList: CustomerGroupListDto[] = [];

    patients: PatientDetails[] = [];
    dataSource = new MatTableDataSource<PatientDetails>(this.patients);

    constructor(
        private _dialog: MatDialog,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        private _customerService: CustomerService,
        private _customergroup: CustomerGroupService,
        private veriServisi: VeriServisi,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        debugger;
    }

    ngOnInit(): void {
        this.getCustomerGroupList();

        this.customeradd = this._formBuilder.group({
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
    }

    fillFormData(selectedproductdesf: customersListDto) {
        debugger;
        if (this.selectedcustomeradd !== null) {
            this.customeradd.setValue({
                //name: selectedproductdesf.name,
            });
        }
    }

    getCustomerGroupList() {
        this._customergroup.getcustomerGroupList().subscribe((response) => {
            this.customergroupList = response.data;
        });
    }

    addOrUpdateCustomer(): void {
        this.selectedcustomeradd ? this.updateCustomer() : this.addCustomer();
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }

    addCustomer(): void {
        const model = {
            createcustomers: this.customers,
        };

        this._customerService.createCustomers(model).subscribe(
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

    updateCustomer() {}

    getFormValueByName(formName: string): any {
        return this.customeradd.get(formName).value;
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

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        const dialog = this._dialog
            .open(CreateEditPatientsDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    debugger;
                    this.patients.push(response.data);
                    this.dataSource = new MatTableDataSource(this.patients);
                }
            });
    }
}
