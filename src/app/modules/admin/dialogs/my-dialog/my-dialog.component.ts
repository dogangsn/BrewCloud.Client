import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {

  @ViewChild('inputValue') inputValue: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  dialogSave(): void {
    alert(this.inputValue.nativeElement.value);
  }

}
