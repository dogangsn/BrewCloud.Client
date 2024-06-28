import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs'; 
import { Item, Items } from '../models/file-manager.types';
import { FileManagerListComponent } from '../list/list.component';
import { FileManagerService } from 'app/core/services/file-manager/file-manager.service';
 

@Component({
    selector       : 'file-manager-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileManagerDetailsComponent implements OnInit, OnDestroy
{
    item: Item;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
 
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fileManagerListComponent: FileManagerListComponent,
        private _fileManagerService: FileManagerService,
        
    )
    {
    }
 
    ngOnInit(): void
    {
      
        this._fileManagerListComponent.matDrawer.open();
 
        this._fileManagerService.item$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((item: Item) => {
 
                this._fileManagerListComponent.matDrawer.open();
 
                this.item = item;
 
                this._changeDetectorRef.markForCheck();
            });

    }

     
    ngOnDestroy(): void
    { 
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
 
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._fileManagerListComponent.matDrawer.close();
    }
 
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
