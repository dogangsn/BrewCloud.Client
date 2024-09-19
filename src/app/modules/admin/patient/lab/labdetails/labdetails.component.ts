
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { PatientListService } from 'app/core/services/patient/patientList/patientList.service';

@Component({
  selector: 'app-labdetails',
  templateUrl: './labdetails.component.html',
  styleUrls: ['./labdetails.component.scss'],
})

export class LabDetailsComponent implements OnInit {


    constructor(
        private route: ActivatedRoute,
    ){

    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


}