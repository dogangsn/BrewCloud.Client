import { Component, Inject, OnInit,Input   } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { TranslocoService } from '@ngneat/transloco';
import { demandProductsListDto } from '../demand1/models/demandProductsListDto';
import { CreateDemandCommand } from '../models/CreateDemandCommand'; 
import { DemandProductsService } from 'app/core/services/Demands/DemandProducts/demandproducts.service'; 
import { UpdateDemandCommand } from '../models/UpdateDemandCommand';  
import { SuppliersService } from 'app/core/services/suppliers/suppliers.service';
import { suppliersListDto } from '../../suppliers/models/suppliersListDto';
import { demandsListDto } from '../models/demandListDto';

@Component({
    selector: 'app-create-edit-demand-dialog',
    styleUrls: ['./create-edit-demand.scss'],
    templateUrl: './create-edit-demand.html',
})
export class CreateEditDemandDialogComponent implements OnInit {
    selectedValue;
    selecteddemand: demandProductsListDto;
    demandList: FormGroup;
    isUpdateButtonActive: Boolean;
    demandProductList: demandProductsListDto[] = [];
    isSupplier: boolean;
    supplierscards: suppliersListDto[] = [];
    selectedCustomerId: any = '';
    demandListAll: demandsListDto;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _demandService: DemandProductsService,
        private _translocoService: TranslocoService,
        private _suppliersService: SuppliersService,
        @Inject(MAT_DIALOG_DATA) public data: demandProductsListDto[]
    ) {
        //this.selecteddemand = data;
    }
    // getBarStyles(value: number) {
    //     let barColor = '';
    //     switch (value) {
    //       case 1:
    //         barColor = 'red';
    //         break;
    //       case 0:
    //         barColor = 'orange';
    //         break;
    //       case -1:
    //         barColor = 'green';
    //         break;
    //       default:
    //         barColor = 'transparent';
    //         break;
    //     }
    
    //     return {
    //       'background-color': barColor,
    //       'height': '10px'
    //     };
    //   }
    ngOnInit(): void {
        debugger;
        this.getProductstedarik();
        this.demandList = this._formBuilder.group({
            date: ['', Validators.required],
            documentno: ['', Validators.required],
            deliverydate: ['', Validators.required],
            note: ['', Validators.required],
            state: [0, Validators.required],
            suppliers:[],
            iscomplated: [true],
            
        });
        this.demandProductList = this.data;
        //this.demandListAll.demandProductList = this.demandProductList;
        debugger;
       // this.fillFormData(this.selecteddemand);

    }

    getProductstedarik() {
        this._suppliersService.getSuppliersList().subscribe((response) => {
            this.supplierscards = response.data;
            console.log(this.supplierscards);
        });
    }
    addDemandProductList(demandProductsListDtos :demandProductsListDto[]): void {
        debugger;
        this.ngOnInit();
        this.demandProductList = demandProductsListDtos;
    }

    filterCustomerId(value: any): void {
        this.selectedCustomerId = value;
    }

    filterProductId(value: any): void {
        this.selectedCustomerId = value;
    }



    
    fillFormData(selectedDemand: demandProductsListDto) {
        debugger;
        if (this.selecteddemand !== null) {
            this.demandList.setValue({
                // casename: selectedCase.casename,
                // active: selectedCase.active,
            });
        }
    }
    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }
    addOrUpdateStore(): void {
        this.selecteddemand
            // ? this.updateCase()
            //: 
            this.addDemand();
    }
        // updateCase(): void {
        // const demandItem = new UpdateDemandCommand(
        //     this.selecteddemand.id,
        //     // this.getFormValueByName('casename'),
        //     // this.getFormValueByName('active')
        // );

    //     this._demandService.updateDemand(caseItem).subscribe(
    //         (response) => {
    //             debugger;

    //             if (response.isSuccessful) {
    //                 this.showSweetAlert('success');
    //                 this._dialogRef.close({
    //                     status: true,
    //                 });
    //             } else {
    //                 this.showSweetAlert('error');
    //             }
    //         },
    //         (err) => {
    //             console.log(err);
    //         }
    //     );
    // }
    setAgendaPriority(priority): void
    {
        // Set the value
        this.demandList.get('state').setValue(priority);
    }
    addDemand(): void {
        debugger;
        const rowdate = this.getFormValueByName('date').toLocaleString();
        const rowdeliverydate = this.getFormValueByName('deliverydate').toLocaleString();
        // const formattedDate = new Date(rowdate).toISOString();
        // const formattedDeliveryDate = new Date(rowdeliverydate).toISOString();
        
        //const demandItem = null;
        const demandItem = new CreateDemandCommand( 
            this.getFormValueByName('date'),
            this.getFormValueByName('documentno'),
            this.getFormValueByName('suppliers'),
            this.getFormValueByName('deliverydate'),
            this.getFormValueByName('note'),
            this.getFormValueByName('state'),
            false,
            this.demandProductList
            );
            this._demandService.createDemands(demandItem).subscribe(
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
        return this.demandList.get(formName).value;
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
