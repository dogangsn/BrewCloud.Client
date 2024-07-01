import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TinymceEditorService } from 'app/modules/bases/global/tinymce-editor.service';
import { PrintType, PrintTypeDisplay } from '../models/printType.enum';
import { Editor, EditorEvent, } from 'tinymce';

@Component({
  selector: 'app-createedit-printtemplate',
  templateUrl: './createedit-printtemplate.component.html',
  styleUrls: ['./createedit-printtemplate.component.css']
})
export class CreateeditPrinttemplateComponent implements OnInit {
 
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;

  selectedprinttemplate: any;
  tinymceOptions: any;
  buttonDisabled = false;
  printtemplate: FormGroup;

  selectedPrintType: PrintType = PrintType.Customer;
  printTypes = Object.values(PrintType).filter(value => typeof value === 'number') as PrintType[];

  availableOptions: { name: string, selected: boolean, value: string }[] = [];
  editorContentControl: FormControl = new FormControl('');
  
  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _tinymceService: TinymceEditorService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.tinymceOptions = this._tinymceService.getTinymceOptions();

    this.printtemplate = this._formBuilder.group({
      templatename: ['', Validators.required],
      printType : [0, Validators.required],
      templatecontent: this.editorContentControl
    });

  }

  addOrUpdatePrintTemplate(): void {

  }

  closeDialog(): void {
    this._dialogRef.close({ status: null });
  }

  getPrintTypeDisplay(type: PrintType): string {
    return PrintTypeDisplay[type];
  }


  updateAvailableOptions(selectedPrintType: PrintType): void {
    switch (selectedPrintType) {
      case PrintType.Customer:
        this.availableOptions = [
          { name: 'Misafir Adı', selected: false, value: '[[customername]]' },
          { name: 'Tarih', selected: false, value: '[[Date]]' },
          { name: 'Hasta', selected: false, value: '[[patient]]' },
          { name: 'Firma Adı', selected: false, value: '[[company]]' },
          { name: 'Randevu Tipi', selected: false, value: '[[appointtpe]]' },
        ];
        break;
      case PrintType.Patient:
        this.availableOptions = [
          { name: 'Hasta Adı', selected: false, value: '[[patientname]]' },
          { name: 'Hasta Yaşı', selected: false, value: '[[patientage]]' },
          { name: 'Tarih', selected: false, value: '[[Date]]' },
          { name: 'Doktor Adı', selected: false, value: '[[doctorname]]' },
        ];
        break; 
      default:
        this.availableOptions = [];
        break;
    }
  }

  toggleSelection(option: any) {
 

    const textarea = this.editorElement.nativeElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const textAfterCursor = textarea.value.substring(cursorPosition);

    const newText = textBeforeCursor + option.value + textAfterCursor;
    this.printtemplate.controls['templatecontent'].setValue(newText);
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = cursorPosition + option.value.length;
    }, 0);
 

  }


}
