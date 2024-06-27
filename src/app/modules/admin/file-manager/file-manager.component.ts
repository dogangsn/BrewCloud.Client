import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Item, Items } from './models/file-manager.types';
 
 
@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  drawerMode: 'side' | 'over';
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  selectedFile: File | null = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  items: Items;
  selectedItem: Item;

  files: any[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  onBackdropClicked(): void {
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
    this._changeDetectorRef.markForCheck();
  }

  openFileUpload() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  // Dosya seçildiğinde çağrılan fonksiyon
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      console.log('Seçilen dosya:', file);
      // Seçilen dosya ile ilgili işlemleri burada yapabilirsiniz
    }
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
 

}

