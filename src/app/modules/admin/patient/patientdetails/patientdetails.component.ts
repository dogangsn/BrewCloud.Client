import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { MessageService } from 'primeng/api';

interface SelectItem {
  label: string;
  value: string;
}
@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.scss'],
  providers: [MessageService]
})
export class PatientDetailsComponent implements OnInit {
  @Output() formDataChanged = new EventEmitter<any>();
  selectedCustomerId: any;
  imageUrl: string | ArrayBuffer | null = null;
  patientForm: FormGroup;
  customers: SelectItem[];
  types: SelectItem[];
  breeds: SelectItem[];
  
  constructor(private route: ActivatedRoute,
    private messageService: MessageService,
    private _formBuilder: FormBuilder) {

    this.customers = [
      { label: 'Doğan Güneş', value: 'DG' },
      // Diğer müşteriler
    ];

    this.types = [
      { label: 'Köpek', value: 'dog' },
      { label: 'Kedi', value: 'cat' },
      // Diğer türler
    ];

    this.breeds = [
      { label: 'Afgan Tazısı', value: 'afghan' },
      // Diğer ırklar
    ];
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedCustomerId = params['id'];
      console.log('Müşteri ID:', this.selectedCustomerId);
    });

    this.patientForm = this._formBuilder.group({
      patientCustomer: ['', Validators.required],
      patientType: ['', Validators.required],
      patientBreed: ['', Validators.required],
      patientName: ['', Validators.required],
      patientBirthDate: ['', Validators.required],
      patientGender: ['', Validators.required],
      patientImg: ['']
    });
  }

  onSelect(event: any) {
    if (event.files && event.files[0]) {
      const file = event.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpload(event: any) {
    for (let file of event.files) {
      // Yüklenen foto ile ilgili işlemler gelecek
      console.log(file);
    }
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  removeImage() {
    this.imageUrl = null;
  }

  saveChanges() {
    if (this.patientForm.valid) {
      console.log('Form Değerleri:', this.patientForm.value);
    } else {
      console.log('Form Geçerli Değil');
    }
  }
}
