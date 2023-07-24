import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';

import {
    FormGroup,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';

import { CreateCustomerCommand } from './models/CreateCustomerCommand';
import { CustomerService } from 'app/core/services/customers/customers.service';

@Component({
    selector: 'customeradd',
    templateUrl: './customeradd.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomeraddComponent implements OnInit {
    customers: CreateCustomerCommand[] = [];
    accountForm: FormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _customerService: CustomerService
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
            longAdress: ['']
        });

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
            this.getFormValueByName('longAdress'),
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

    // showSweetAlert(type: string): void {
    //   if (type === 'success') {
    //       const sweetAlertDto = new SweetAlertDto(
    //           this.translate('sweetalert.success'),
    //           this.translate('sweetalert.transactionSuccessful'),
    //           SweetalertType.success);
    //           GlobalService.sweetAlert(sweetAlertDto);
    //   }
    //   else {
    //       const sweetAlertDto = new SweetAlertDto(
    //           this.translate('sweetalert.error'),
    //           this.translate('sweetalert.transactionFailed'),
    //           SweetalertType.error);
    //           GlobalService.sweetAlert(sweetAlertDto);
    //   }
    // }


}
