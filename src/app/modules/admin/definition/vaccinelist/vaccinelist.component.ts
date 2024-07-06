import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VaccineListDto } from './models/vaccineListDto';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditVaccineDialogComponent } from './dialogs/create-edit-vaccine';
import { VaccineService } from 'app/core/services/definition/vaccinelist/vaccinelist.service';
import { VetVetAnimalsTypeListDto } from '../../customer/models/VetVetAnimalsTypeListDto';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { MatChipListboxChange } from '@angular/material/chips';
import { LogViewComponent } from '../../commonscreen/log-view/log-view.component';

@Component({
  selector: 'app-vaccinelist',
  templateUrl: './vaccinelist.component.html',
  styleUrls: ['./vaccinelist.component.css']
})
export class VaccinelistComponent implements OnInit {

  displayedColumns: string[] = ['animalType', 'vaccineName', 'timeDone', 'renewalOption', 'totalSaleAmount', 'actions'];
  isUpdateButtonActive: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  vaccine: VaccineListDto[] = [];
  dataSource = new MatTableDataSource<VaccineListDto>(this.vaccine);
  animalTypesList: VetVetAnimalsTypeListDto[] = [];
  loader=true;
  items = Array(13);

  options = [
    { name: 'Köpek', selected: false, type:1 },
    { name: 'Kedi', selected: false, type:2 },
    { name: 'Tümü', selected: true, type:0 }
  ];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dialog: MatDialog,
    private _vaccineService: VaccineService,
    private _customerService: CustomerService,
    private _translocoService: TranslocoService,
  ) {

  }

  ngOnInit() {

    zip(
      this.getAnimalTypesList()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => {
        this.setAnimalType(value[0])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.getVaccineList();
        this.loader = false;
      }
    });

  }

  getVaccineList() {

    const model = {
      AnimalType : 0
    };


    this._vaccineService
      .getVaccineList(model)
      .subscribe((response) => {
        this.vaccine = response.data;
        console.log(this.vaccine);

        this.dataSource = new MatTableDataSource<VaccineListDto>(
          this.vaccine
        );
        this.dataSource.paginator = this.paginator;
      });
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

  public redirectToUpdate = (id: string) => {
    this.isUpdateButtonActive = true;
    const selectedvaccine = this.vaccine.find((x) => x.id === id);
    if (selectedvaccine) {
      const dialogRef = this._dialog.open(
        CreateEditVaccineDialogComponent,
        {
          maxWidth: '100vw !important',
          disableClose: true,
          data: selectedvaccine
        }
      );
      dialogRef.afterClosed().subscribe((response) => {
        if (response.status) {
          this.getVaccineList();
        }
      });
    }
  };

  onChipsSelectionChange(event: MatChipListboxChange): void {
    const selectedValue = event.value;
    debugger
    console.log('Selected value:', selectedValue);
    this.filterVaccineList(selectedValue);
  }

  filterVaccineList(selectedValue: Number): void {
    debugger
    if (selectedValue === 0) {
      this.dataSource.data = this.vaccine;
    } else {
      const animalTypeId = this.animalTypesList.find(animal => animal.type === selectedValue)?.type;
      this.dataSource.data = this.vaccine.filter(vaccine => vaccine.animalType.toString() === animalTypeId.toString());
    }
    this.dataSource.paginator = this.paginator; // Reset paginator to the first page after filtering
  }

  public logView = (id: string) => {
    const dialogRef = this._dialog.open(
        LogViewComponent,
        {
            maxWidth: '100vw !important',
            disableClose: true,
            data: { masterId: id },
        }
    );
}


}
