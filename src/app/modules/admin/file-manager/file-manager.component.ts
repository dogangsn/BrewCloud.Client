import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  drawerMode: 'side' | 'over';

  selectedFile: File | null = null;
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  onBackdropClicked(): void
  {
      this._router.navigate(['./'], {relativeTo: this._activatedRoute});
      this._changeDetectorRef.markForCheck();
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile); 
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      // Dosya yükleme işlemlerini burada yapabilirsiniz
      console.log('Uploading file:', this.selectedFile);
    } else {
      console.error('No file selected!');
    }
  }

}
