import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { VaccineListDto } from 'app/modules/admin/definition/vaccinelist/models/vaccineListDto';
import { MatDialog } from '@angular/material/dialog';
import { VaccineService } from 'app/core/services/definition/vaccinelist/vaccinelist.service';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { MatChipListboxChange } from '@angular/material/chips';
import { VetVetAnimalsTypeListDto } from 'app/modules/admin/customer/models/VetVetAnimalsTypeListDto';
import { CreateEditVaccineDialogComponent } from 'app/modules/admin/definition/vaccinelist/dialogs/create-edit-vaccine';
import { PatientListService } from 'app/core/services/patient/patientList/patientList.service';
import { PatientOwnerListDto } from '../../patientlist/models/patientOwnerListDto';
import { PatientDetailsDto } from 'app/modules/admin/customer/models/PatientDetailsDto';

@Component({
  selector: 'app-createvaccine',
  templateUrl: './createvaccine.component.html',
  styleUrls: ['./createvaccine.component.css']
})
export class CreatevaccineComponent implements OnInit {

  selectedPatientId: string;
  vaccine: VaccineListDto[] = [];
  dataSource = new MatTableDataSource<VaccineListDto>(this.vaccine);
  displayedColumns: string[] = ['vaccineName', 'timeDone', 'renewalOption', 'totalSaleAmount'];
  animalTypesList: VetVetAnimalsTypeListDto[] = [];
  isUpdateButtonActive: boolean;
  animalType: number;
  isAdd: boolean = false;
  isDone: boolean = false;
  patient: PatientDetailsDto;
  birthDate: Date;

  destroy$: Subject<boolean> = new Subject<boolean>();



  constructor(
    private route: ActivatedRoute,
    private _translocoService: TranslocoService,
    private _dialog: MatDialog,
    private _vaccineService: VaccineService,
    private _customerService: CustomerService,
    private _patientService: PatientListService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedPatientId = params['id'];
      console.log('Müşteri ID:', this.selectedPatientId);
  });

    zip(
      this.getPatient(),
      this.getAnimalTypesList()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => {
        this.setPatient(value[0]),
        this.setAnimalType(value[1])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.getVaccineList();
      }
    });

  
  }


  getVaccineList() {
    const model = {
        AnimalType : this.animalType
    };

    this._vaccineService
      .getVaccineList(model)
      .subscribe((response) => {
        this.vaccine = response.data;
        console.log(this.vaccine);

        this.dataSource = new MatTableDataSource<VaccineListDto>(
          this.vaccine
        );
        this.vaccine.forEach(element => {
          element.isAdd = element.timeDone > 0;
          const vaccineDate = new Date(this.birthDate);
          vaccineDate.setDate(vaccineDate.getDate() + element.timeDone);
          element.vaccineDate = vaccineDate;
        });
        
      });
  }

  getPatient(): Observable<any> {
    const model = {
      Id : this.selectedPatientId
    };

    return this._patientService.getPatientFindById(model);
  }

  setPatient(response: any): void {
    debugger
    if (response.data) {
      this.patient = response.data;
      this.animalType = this.patient.animalType == 'Köpek' ? 1 : this.patient.animalType == 'Kedi' ? 2 : 0;
      this.birthDate = new Date(this.patient.birthDate);
      
    }
  }


  getAnimalTypesList(): Observable<any> {
    return this._customerService.getVetVetAnimalsType();
  }

  setAnimalType(response: any): void {
    if (response.data) {
      this.animalTypesList = response.data;
    }
  }

  addPanelOpen(): void {
    this.isUpdateButtonActive = false;
    const dialog = this._dialog
      .open(CreateEditVaccineDialogComponent, {
        maxWidth: '100vw !important',
        disableClose: true,
        data: null,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response.status) {
          this.getVaccineList();
        }
      });
  }

  getRenewalOptionText(option: number): string {
    switch (option) {
      case 1: return 'Yenilenmesin';
      case 2: return 'Her hafta';
      case 3: return 'Her ay';
      case 4: return 'Her yıl';
      case 5: return '2 haftada 1';
      case 6: return '3 haftada 1';
      case 7: return '10 haftada 1';
      case 8: return '2 ayda 1';
      case 9: return '3 ayda 1';
      case 10: return '4 ayda 1';
      case 11: return '6 ayda 1';
      case 12: return '8 ayda 1';
      case 13: return '2 yılda 1';
      case 14: return '3 yılda 1';
      case 15: return '4 yılda 1';
      case 16: return '45 günde 1';
      default: return '';
    }
  }

  getAnimalTypeText(option: string): string {
    const optionNumber = parseInt(option, 10);

    if (!isNaN(optionNumber)) {
      const value = this.animalTypesList.find(x => x.type === optionNumber);
      if (value) {
        return value.name;
      }
    }
    return '';
  }

  getTotalSaleAmountText(totalSaleAmount: number): string {
    return totalSaleAmount === 0 ? '-' : totalSaleAmount.toFixed(2);
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
  }

  showSweetAlert(type: string, message: string): void {
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
        this.translate(message),
        SweetalertType.error
      );
      GeneralService.sweetAlert(sweetAlertDto);
    }
  }

  public redirectToDelete = (id: string) => {
    const sweetAlertDto = new SweetAlertDto(
      this.translate('sweetalert.areYouSure'),
      this.translate('sweetalert.areYouSureDelete'),
      SweetalertType.warning
    );
    GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
      (swalResponse) => {
        if (swalResponse.isConfirmed) {
          const model = {
            id: id,
          };
          this._vaccineService
            .deleteVaccine(model)
            .subscribe((response) => {
              if (response.isSuccessful) {
                this.getVaccineList();
                const sweetAlertDto2 = new SweetAlertDto(
                  this.translate('sweetalert.success'),
                  this.translate('sweetalert.transactionSuccessful'),
                  SweetalertType.success
                );
                GeneralService.sweetAlert(sweetAlertDto2);
              } else {
                this.showSweetAlert('error', response.errors[0]);
                console.log(response.errors[0]);
              }
            });
        }
      }
    );
  };


}
