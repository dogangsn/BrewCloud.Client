import { ExaminationListDto } from './../../models/ExaminationListDto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExaminationService } from 'app/core/services/examination/exammination.service';
import { ExaminationaddComponent } from '../examinationadd/examinationadd.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExaminationAddDialogComponent } from '../examination-add-dialog/examination-add-dialog.component';
import { ExaminationDto } from '../../models/ExaminationDto';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { TranslocoService } from '@ngneat/transloco';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';

@Component({
    selector: 'app-examinationlist',
    templateUrl: './examinationlist.component.html',
    styleUrls: ['./examinationlist.component.css'],
})
export class ExaminationlistComponent implements OnInit {
    examinationList: ExaminationListDto[] = [];
    dataSource = new MatTableDataSource<ExaminationListDto>(
        this.examinationList
    );
    loader = true;
    examination: ExaminationDto;

    displayedColumns: string[] = [
        'date',
        // 'muayneDurumu',
        'customerName',
        'patientName',
        // 'bodyTemperature',
        // 'pulse',
        // 'respiratoryRate',
        'weight',
        'complaintStory',
        'treatmentDescription',
        'symptoms',
        'actions',
    ];

    @ViewChild('paginator') paginator: MatPaginator;
    isUpdateButtonActive: boolean = false;

    constructor(
        private _examinationService: ExaminationService,
        private _dialog: MatDialog,
        private _translocoService: TranslocoService
    ) {}

    ngOnInit() {
        this.getExaminationList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getExaminationList() {
        this._examinationService.getExaminationlist().subscribe((response) => {
            this.examinationList = response.data;
            this.dataSource = new MatTableDataSource<ExaminationListDto>(
                this.examinationList
            );
            this.dataSource.paginator = this.paginator;

            this.loader = false;
        });
    }

    addPanelOpen(): void {
        const dialog = this._dialog
            .open(ExaminationAddDialogComponent, {
                maxWidth: '100vw !important',
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    this.getExaminationList();
                }
            });
    }

    translate(key: string): any {
        return this._translocoService.translate(key);
    }

    public redirectToUpdate = (id: string) => {
        this.isUpdateButtonActive = true;

        const selectedExamination = this.examinationList.find(
            (x) => x.id === id
        );
        var model = {
            id: selectedExamination.id,
        };
        if (selectedExamination) {
            const dialogRef = this._dialog.open(ExaminationAddDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: selectedExamination.id,
            });
            dialogRef.afterClosed().subscribe((response) => {
                if (response.status) {
                    this.getExaminationList();
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
                    const selectedExamination = this.examinationList.find(
                        (x) => x.id === id
                    );
                    var model = {
                        id: selectedExamination.id,
                    };
                    this._examinationService
                        .deleteExamination(model)
                        .subscribe((response) => {
                            if (response.isSuccessful) {
                                this.getExaminationList();
                                const sweetAlertDto2 = new SweetAlertDto(
                                    this.translate('sweetalert.success'),
                                    this.translate(
                                        'sweetalert.transactionSuccessful'
                                    ),
                                    SweetalertType.success
                                );
                                GeneralService.sweetAlert(sweetAlertDto2);
                            } else {
                                this.showSweetAlert(
                                    'error',
                                    response.errors[0]
                                );
                                console.log(response.errors[0]);
                            }
                        });
                }
            }
        );
    };

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
}
