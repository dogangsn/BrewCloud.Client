import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalColorsDefListDto } from '../../../models/AnimalColorsDefListDto';
import { VetVetAnimalsTypeListDto } from '../../../models/VetVetAnimalsTypeListDto';
import { VetAnimalBreedsDefDto } from '../../../models/VetAnimalBreedsDefDto';
import { PatientDetails, SexTYpe } from '../../../models/PatientDetailsCommand';
import { CreateEditAnimalsColorDialogComponent } from '../../../customeradd/dialog/create-edit-animalscolor';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { AnimalColorsDefService } from 'app/core/services/definition/animalColorsDef/animalColorsDef.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { v4 as uuidv4 } from 'uuid';
import { CreatePatientCommand } from '../../../models/CreatePatientCommand';

@Component({
  selector: 'app-create-edit-customerpatients',
  templateUrl: './create-edit-customerpatients.component.html',
  styleUrls: ['./create-edit-customerpatients.component.css']
})
export class CreateEditCustomerpatientsComponent implements OnInit {

  selectedpatients: any;
  patientDetailsForm: FormGroup;

  animalcolorDefList: AnimalColorsDefListDto[] = [];
  animalTypesList: VetVetAnimalsTypeListDto[] = [];
  animalBreedsDef: VetAnimalBreedsDefDto[] = [];
  sextype: SexTYpe[];

  filteredAnimalBreed: VetAnimalBreedsDefDto[];
  buttonDisabled = false;
  selectedCustomerId: any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService,
    private _animalColorDefService: AnimalColorsDefService,
    private _customerService: CustomerService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedCustomerId = data.customerId;
  }

  ngOnInit() {
    
    this.getAnimalColorsDefList();
    this.getAnimalTypesList();
    this.getAnimalBreedsDefList();
    this.sextype = sextype;
    this.patientDetailsForm = this._formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      birthDate: [''],
      chipNumber: [''],
      sex: ['1'],
      animalType: [0],
      animalBreed: [''],
      animalColor: [''],
      reportNumber: [''],
      specialNote: [''],
      sterilization: [''],
      images: [[]],
      active: [false],
    });



  }

  filterTagsByVendor(selectedVendor: any) {

    const selectedValue = selectedVendor.value;
    this.filteredAnimalBreed = this.animalBreedsDef.filter(
      (tag) => tag.animaltype == selectedValue
    );
    this.animalBreedsDef.forEach((tag) => {
      tag.isSelected = false;
    });
    // this.selectedPatientDetailsForm.get('animalBreed').setValue(null);
    // this.selectedPatients.animalBreed = null;
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
      console.log('anımals', this.animalTypesList);
    });
  }

  getAnimalBreedsDefList() {
    this._customerService.getAnimalBreedsDefList().subscribe((response) => {
      this.animalBreedsDef = response.data;
    });
  }

  addPanelOpen(): void {
    const dialog = this._dialog
      .open(CreateEditAnimalsColorDialogComponent, {
        maxWidth: '100vw !important',
        disableClose: true,
        data: null,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response.status) {
          // this.getAnimalColorsDefList();
        }
      });

  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
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

  addOrUpdatePatients(): void {
    this.buttonDisabled = true;
    this.selectedpatients ? this.addPatients() : this.updatePatients();
  }

  addPatients(): void {

    const item: PatientDetails = {
      id: '',
      recId: uuidv4(),
      name: this.patientDetailsForm.value?.name,
      birthDate: this.patientDetailsForm.value?.birthDate,
      chipNumber: this.patientDetailsForm.value?.chipNumber,
      sex: this.patientDetailsForm.value?.sex,
      animalType: this.patientDetailsForm.value?.animalType,
      animalBreed: this.patientDetailsForm.value?.animalBreed,
      animalColor: this.patientDetailsForm.value?.animalColor,
      reportNumber: this.patientDetailsForm.value?.reportNumber,
      specialNote: this.patientDetailsForm.value?.specialNote,
      sterilization: this.patientDetailsForm.value?.sterilization,
      active: true,
      thumbnail: this.patientDetailsForm.value?.thumbnail,
      images: [],
    };
    const patientModel = new CreatePatientCommand(
      this.selectedCustomerId,
      item
    );

    this._customerService.createPatients(patientModel).subscribe(
      (response) => {
        if (response.isSuccessful) {
          this.showSweetAlert('success');
          this._dialogRef.close({
            status: true,
          });
        } else {
          this.showSweetAlert('error');
          this.buttonDisabled = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }

  updatePatients(): void {

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