import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { PatientDetails } from '../models/PatientDetailsCommand';
import { customersListDto } from '../models/customersListDto';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { ExaminationDto } from '../models/ExaminationDto';
import { TranslocoService } from '@ngneat/transloco';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExaminationService } from 'app/core/services/examination/exammination.service';

@Component({
    selector: 'app-examinationadd',
    templateUrl: './examinationadd.component.html',
    styleUrls: ['./examinationadd.component.css'],
})
export class ExaminationaddComponent implements OnInit {
    examinationForm: FormGroup;

    patientList: PatientDetails[] = [];
    customers: customersListDto[] = [];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    selectedCustomerId: any;
    panelOpenState = false;
    selectedOption: string;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl('');
    filteredFruits: Observable<string[]>;
    fruits: string[] = ['Lemon'];
    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
    lastSelectedValue: Date = new Date();
    now: Date = new Date();
    addOnBlur = true;
    announcer = inject(LiveAnnouncer);
    symptomsString:string;
    selectedState: string;
    states: string[] = ['Aktif', 'Tamamlandı', 'Bekliyor'];

    addEnabled: boolean = true;
  visibleCustomer: boolean;
  addVaccineList: any;
  _dialogRef: any;

    constructor(
        private _customerService: CustomerService,
        private _formBuilder: UntypedFormBuilder,
        private _translocoService: TranslocoService,
        
        private _examinationService : ExaminationService,
        
    ) {
      debugger
      this.selectedState=this.states[0];
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) =>
                fruit ? this._filter(fruit) : this.allFruits.slice()
            )
        );
    }

    ngOnInit() {
       
        this.getCustomerList();
        
        this.examinationForm = this._formBuilder.group({
            customerId: [''],
            patientId: [''],
            bodyTemperature: [''],
            pulse: [''],
            respiratoryRate: [''],
            weight: [''],
            complaintAndHistory: [''],
            treatmentDescription: [''],
            selectedState: [''],
        });
    }

    getCustomerList() {
        this._customerService.getcustomerlist().subscribe((response) => {
            this.customers = response.data;
        });
    }
    getPatientList() {
        debugger;
        this._customerService
            .getPatientsByCustomerId(this.customers[0].id)
            .subscribe((response) => {
                this.patientList = response.data;
            });
    }

    getFormValueByName(formName: string): any {
        return this.examinationForm.get(formName).value;
    }

    examinationadd(): void {
        const sweetAlertDto = new SweetAlertDto(
            this.translate('sweetalert.areYouSure'),
            this.translate('sweetalert.apponitnmentAreSure'),
            SweetalertType.warning
        );
        GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
            (swalResponse) => {
                if (swalResponse.isConfirmed) {
                  this.symptomsString = this.fruits.join(', '); 
debugger;
                  const item = new ExaminationDto(
                    this.lastSelectedValue,
                    this.selectedState,
                    ((this.getFormValueByName('customerId') === undefined || this.getFormValueByName('customerId') === null || this.getFormValueByName('customerId') === "") ? '00000000-0000-0000-0000-000000000000' :  this.getFormValueByName('customerId')) ,
                    ((this.getFormValueByName('patientId') === undefined || this.getFormValueByName('patientId') === null || this.getFormValueByName('patientId') === "") ? '00000000-0000-0000-0000-000000000000' :  this.getFormValueByName('patientId')) ,
                    this.getFormValueByName('bodyTemperature') === null ? "" : this.getFormValueByName('bodyTemperature'),
                    this.getFormValueByName('pulse') === null ? "" : this.getFormValueByName('pulse'),
                    this.getFormValueByName('respiratoryRate') === null ? "" : this.getFormValueByName('respiratoryRate'),
                    this.getFormValueByName('weight') === null ? "" : this.getFormValueByName('weight'),
                    this.getFormValueByName('complaintAndHistory') === null ? "" : this.getFormValueByName('complaintAndHistory'),
                    this.getFormValueByName('treatmentDescription') === null ? "" : this.getFormValueByName('treatmentDescription'),
                    this.symptomsString,
                );
                

                    this._examinationService.createExamination(item).subscribe(
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
            }
        );
    }

    closeDialog(): void {
        this._dialogRef.close({ status: null });
    }


    handleCustomerChange(event: any) {
        const model = {
            id: event.value,
        };
        if (model.id == undefined) {
            model.id = event;
        }

        debugger;
        this._customerService
            .getPatientsByCustomerId(model)
            .subscribe((response) => {
                this.patientList = response.data;
                if (this.patientList.length === 1) {
                    this.examinationForm
                        .get('patientId')
                        .patchValue(this.patientList[0].recId);
                }
            });
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        var varMi = this.allFruits.some((fruit) =>
            fruit.toLowerCase().startsWith(value.toLowerCase())
        );
        if (varMi) {
            return;
        }
        if (value) {
            this.fruits.push(value);
        }

        event.chipInput!.clear();

        this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if (!this.fruits.includes(event.option.viewValue)) {
            this.fruits.push(event.option.viewValue);
        }
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter((fruit) =>
            fruit.toLowerCase().includes(filterValue)
        );
    }

    handleValueChange(e) {
        this.lastSelectedValue = e.value; // Son seçilen değeri saklıyoruz
        console.log('Yeni tarih ve saat: ', this.lastSelectedValue);
        // Yeni değeri kullanmak için burada işlemler yapabilirsiniz
    }
    translate(key: string): any {
      return this._translocoService.translate(key);
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

}
