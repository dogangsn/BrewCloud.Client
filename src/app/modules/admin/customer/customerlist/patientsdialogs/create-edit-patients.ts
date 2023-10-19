import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';
import { PatientDetails, SexTYpe } from '../../models/PatientDetailsCommand';
import { VetAnimalBreedsDefDto } from '../../models/VetAnimalBreedsDefDto';
import { AnimalColorsDefListDto } from '../../models/AnimalColorsDefListDto';
import { VeriServisi } from '../service/veri-servisi';
import { AnimalColorsDefService } from 'app/core/services/definition/animalColorsDef/animalColorsDef.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { VetVetAnimalsTypeListDto } from '../../models/VetVetAnimalsTypeListDto';
import {MatStepperModule} from '@angular/material/stepper';

export interface DialogData {
    count: string;
  }

@Component({
    selector: 'app-create-edit-patients-dialog',
    styleUrls: ['./create-edit-patients.css'],
    templateUrl: './create-edit-patients.html',
})

export class CreateEditPatientsDialogComponent implements OnInit {
    selectedpatients: PatientDetails;
    selectedPatientDetailsForm: FormGroup;
    selectedImage: string | ArrayBuffer | null = null;
    stepIndex:number;

    filteredTags: VetAnimalBreedsDefDto[];

    animalcolorDefList: AnimalColorsDefListDto[] = [];
    animalTypesList: VetVetAnimalsTypeListDto[] = [];
    animalBreedsDef: VetAnimalBreedsDefDto[] = [];
    sextype: SexTYpe[];
    counter:number;
    patientSteps:any[] = [];
    tagsEditMode: boolean = false;
    flashMessage: 'success' | 'error' | null = null;

    patients: any[] = [];

    @Output() modalKapatildi = new EventEmitter();

    constructor(
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: FormBuilder,
        private _unitservice: UnitsService,
        private _translocoService: TranslocoService,
        private _animalColorDefService: AnimalColorsDefService,
        private _customerService: CustomerService,
        public dialogRef: MatDialogRef<CreateEditPatientsDialogComponent>,
        public MatStepper:MatStepperModule,
        @Inject(MAT_DIALOG_DATA) public tabCount: DialogData,
        
    ) {}

    ngOnInit(): void {
        this.getAnimalColorsDefList();
        this.getAnimalTypesList();
        this.getAnimalBreedsDefList();
        debugger
        this.counter=parseInt(this.tabCount.count);
        this.counter?0:this.counter=1;
        for (let i = 0; i < this.counter; i++) {
            this.patientSteps.push({step:"$i"});
        }


        this.selectedPatientDetailsForm = this._formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            birthDate: [''],
            chipNumber: [''],
            sex: [''],
            animalType: [''],
            animalBreed: [''],
            animalColor: [''],
            reportNumber: [''],
            specialNote: [''],
            sterilization: [''],
            images: [[]],
            active: [false],
        });
        this.fillFormData(this.selectedpatients);
        this.sextype = sextype;
        this.stepIndex = 0;
        // this.brands = brands;
        // this.patients = products;
        // this.tags = tags;
    }

    fillFormData(selectedPatientDetailsForm: PatientDetails) {
        debugger;
        // if (this.selectedunitdefinition !== null) {
        //     this.unitdefinition.setValue({
        //         unitCode: selectedUnitdef.unitCode,
        //         unitName: selectedUnitdef.unitName,
        //     });
        // }
    }

    addOrUpdatePatients(): void {
        this.selectedpatients=this.selectedPatientDetailsForm.value;
        this.patients.push(this.selectedpatients);
        this.addpatients();
    }

    closeDialog(data?: any): void {
        this._dialogRef.close({ status: data ? true : false, data: data });
    }

    addpatients(): void {
        this.modalKapatildi.emit();
        const valueForm = this.selectedPatientDetailsForm.value;
        this.closeDialog(this.patients);
    }

    patientNext(): void{
        debugger
        this.selectedpatients=this.selectedPatientDetailsForm.value;
        this.patients.push(this.selectedpatients);
        this.stepIndex++;
    }

    patientBack(): void{
        this.stepIndex--;
    }

    updatepatients(): void {
    }

    getFormValueByName(formName: string): any {
        return this.selectedPatientDetailsForm.get(formName).value;
    }

    isLastStep(): boolean {
        // Mevcut adımın endeksini kontrol edin
        return this.stepIndex === this.patientSteps.length - 1;
    }

    isFirstStep(): boolean{
        return this.stepIndex === 0
    }

    finish() {
        // Bitir düğmesi tıklandığında yapılacak işlem
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

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];

        if (file) {
            // Resmi okuyun ve görüntülemek için selectedImage değişkenine ata
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedImage = e.target.result;
            };
            reader.readAsDataURL(file);

            // Resmi form verilerine ekleyin (isteğe bağlı)
            this.selectedPatientDetailsForm.patchValue({
                images: [file], // Dosyayı form kontrolüne eklerken bir dizi içine yerleştiriyoruz.
            });
        }
    }

    filterTagsByVendor(selectedVendor: any) {
        debugger;
        const selectedValue = selectedVendor.value;
        // Seçilen vendor'a ait tagleri filtrele
        this.filteredTags = this.animalBreedsDef.filter(
            (tag) => tag.animaltype == selectedValue
        );
    }

    filterTags(event): void {
        const value = event.target.value.toLowerCase();
        this.filteredTags = this.animalBreedsDef.filter((tag) =>
            tag.breedName.toLowerCase().includes(value)
        );
    }

    filterTagsInputKeyDown(event): void {
        if (event.key !== 'Enter') {
            return;
        }
        if (this.filteredTags.length === 0) {
            //this.createTag(event.target.value);
            event.target.value = '';
            return;
        }
        const tag = this.filteredTags[0];
        // const isTagApplied = this.selectedPatients.tags.find(
        //     (id) => id === tag.id
        // );
        // if (isTagApplied) {
        //     this.removeTagFromProduct(tag);
        // } else {
        //     this.addTagToProduct(tag);
        // }
    }

    getAnimalColorsDefList() {
        this._animalColorDefService
            .getAnimalColorsDefList()
            .subscribe((response) => {
                this.animalcolorDefList = response.data;
            });
    }

    getAnimalTypesList() {
        this._customerService.getVetVetAnimalsType().subscribe((response) => {
            this.animalTypesList = response.data;
        });
    }

    getAnimalBreedsDefList() {
        this._customerService.getAnimalBreedsDefList().subscribe((response) => {
            this.animalBreedsDef = response.data;
        });
    }
    
}

export const sextype = [
    {
        id: '1',
        parentId: null,
        name: 'Erkek',
        slug: 'Erkek',
    },
    {
        id: '2',
        parentId: null,
        name: 'Dişi',
        slug: 'Dişi',
    },
];
