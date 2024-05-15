import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { MessageService } from 'primeng/api';

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

  constructor(private route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _customerService: CustomerService,
    private _translocoService: TranslocoService,
    private _dialog: MatDialog,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedCustomerId = params['id'];
      console.log('Müşteri ID:', this.selectedCustomerId);
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
      // Yüklenen dosyalarla ilgili işlemler
      console.log(file);
    }
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }

  removeImage() {
    this.imageUrl = null;
  }
}
