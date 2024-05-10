import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  drawerMode: 'side' | 'over';
  
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

}
