import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { Item, Items } from '../models/file-manager.types';
import { FileManagerListComponent } from '../list/list.component';
import { FileManagerService } from 'app/core/services/file-manager/file-manager.service';
import { TranslocoService } from '@ngneat/transloco';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';


@Component({
    selector: 'file-manager-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileManagerDetailsComponent implements OnInit, OnDestroy {

    item: Item;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fileManagerListComponent: FileManagerListComponent,
        private _fileManagerService: FileManagerService,
        private _translocoService: TranslocoService
    ) {

    }

    ngOnInit(): void {

        this._fileManagerListComponent.matDrawer.open();

        this._fileManagerService.item$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((item: Item) => {

                this._fileManagerListComponent.matDrawer.open();

                this.item = item;

                this._changeDetectorRef.markForCheck();
            });

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._fileManagerListComponent.matDrawer.close();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
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

                    var model = {
                        id: this.item.id,
                    };
                    this._fileManagerService
                        .deleteFileManager(model)
                        .subscribe((response) => {
                            if (response.isSuccessful) {
                                //this.getExaminationList();
                                this.closeDrawer();
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

    translate(key: string): any {
        return this._translocoService.translate(key);
    }

    formatDate(date: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(date).toLocaleString('tr-TR', options);
    }
}
