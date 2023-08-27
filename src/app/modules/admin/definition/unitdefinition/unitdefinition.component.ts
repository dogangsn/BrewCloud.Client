import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUnitDefinitionDialogComponent } from './dialogs/create-edit-unitdefinition';
import { MatPaginator } from '@angular/material/paginator';
import { unitdefinitionListDto } from './models/unitdefinitionListDto';
import { MatTableDataSource } from '@angular/material/table';
import { UnitsService } from 'app/core/services/definition/unitdefinition/units.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-Unit',
    templateUrl: './unitdefinition.component.html',
    styleUrls: ['./unitdefinition.component.scss'],
})
export class UnitComponent implements OnInit {
    displayedColumns: string[] = ['unitCode', 'unitName', 'actions'];

    isUpdateButtonActive: boolean;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    units: unitdefinitionListDto[] = [];
    dataSource = new MatTableDataSource<unitdefinitionListDto>(this.units);

    constructor(
        private _dialog: MatDialog,
        private _unitsservice: UnitsService,
        private _translocoService: TranslocoService
    ) {}

    ngOnInit() {
      this.UnitsList();
    }

    UnitsList() {
        this._unitsservice.getUnitsList().subscribe((response) => {
            this.units = response.data;
            console.log(this.units);
        });
    }

    addPanelOpen(): void {
        this.isUpdateButtonActive = false;
        const dialog = this._dialog
            .open(CreateEditUnitDefinitionDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    this.UnitsList();
                }
            });
    }

    public redirectToUpdate = (id: string) => {
        this.isUpdateButtonActive = true;
        const selectedStore = this.units.find((units) => units.id === id);
        if (selectedStore) {
            const dialogRef = this._dialog.open(
                CreateEditUnitDefinitionDialogComponent,
                {
                    maxWidth: '100vw !important',
                    disableClose: true,
                    data: selectedStore
                }
            );
            dialogRef.afterClosed().subscribe((response) => {
                if (response.status) {
                    this.UnitsList();
                }
            });
        }
    };

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
                    this._unitsservice
                        .deleteUnits(model)
                        .subscribe((response) => {
                            if (response.isSuccessful) {
                                this.UnitsList();
                                const sweetAlertDto2 = new SweetAlertDto(
                                    this.translate('sweetalert.success'),
                                    this.translate('sweetalert.transactionSuccessful'),
                                    SweetalertType.success
                                );
                                GeneralService.sweetAlert(sweetAlertDto2);
                            } else {
                                console.error('Silme işlemi başarısız.');
                            }
                        });
                }
            }
        );
    };

    
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