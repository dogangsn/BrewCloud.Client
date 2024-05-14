import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';

@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  @Output() formDataChanged = new EventEmitter<any>();
  selectedCustomerId: any;

  constructor(private route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _customerService: CustomerService,
    private _translocoService: TranslocoService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedCustomerId = params['id'];
      console.log('Müşteri ID:', this.selectedCustomerId);
  });

    debugger;
  }

}
