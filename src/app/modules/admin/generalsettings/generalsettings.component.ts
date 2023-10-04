import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-generalsettings',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css']
})
export class GeneralsettingsComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'company';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) { }

  ngOnInit() {
    this.panels = [
      {
          id         : 'company',
          icon       : 'heroicons_outline:lock-closed',
          title      : 'Şirket',
          description: 'Şirket Bilgileri, Şube işlemleri ve Genel Bilgileri'
      },
      {
          id         : 'appkey',
          icon       : 'heroicons_outline:lock-closed',
          title      : 'App Key',
          description: 'Entegrasyon İşlemlerinde Oluşturulacak Key'
      },
      {
          id         : 'authority',
          icon       : 'heroicons_outline:credit-card',
          title      : 'Yetkiler',
          description: 'Menü, Ekran Ayarları üzerinde yetki kontrollerin yapılması'
      },
      {
          id         : 'rolDef',
          icon       : 'heroicons_outline:bell',
          title      : 'Roller',
          description: 'Kulalnıcı işlemlerinde rol tanımlarını yapılması'
      },
      {
          id         : 'logs',
          icon       : 'heroicons_outline:user-group',
          title      : 'Log Kayıtları',
          description: 'İşlemlerde Silme/Düzenleme/Ekleme Log kayıtları detayları'
      }
  ];

  // Subscribe to media changes
  this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({matchingAliases}) => {

          // Set the drawerMode and drawerOpened
          if ( matchingAliases.includes('lg') )
          {
              this.drawerMode = 'side';
              this.drawerOpened = true;
          }
          else
          {
              this.drawerMode = 'over';
              this.drawerOpened = false;
          }

          // Mark for check
          this._changeDetectorRef.markForCheck();
      });
  }

      /**
     * On destroy
     */
      ngOnDestroy(): void
      {
          // Unsubscribe from all subscriptions
          this._unsubscribeAll.next(null);
          this._unsubscribeAll.complete();
      }
  
      // -----------------------------------------------------------------------------------------------------
      // @ Public methods
      // -----------------------------------------------------------------------------------------------------
  
      /**
       * Navigate to the panel
       *
       * @param panel
       */
      goToPanel(panel: string): void
      {
          this.selectedPanel = panel;
  
          // Close the drawer on 'over' mode
          if ( this.drawerMode === 'over' )
          {
              this.drawer.close();
          }
      }
  
      /**
       * Get the details of the panel
       *
       * @param id
       */
      getPanelInfo(id: string): any
      {
          return this.panels.find(panel => panel.id === id);
      }
  
      /**
       * Track by function for ngFor loops
       *
       * @param index
       * @param item
       */
      trackByFn(index: number, item: any): any
      {
          return item.id || index;
      }

}
