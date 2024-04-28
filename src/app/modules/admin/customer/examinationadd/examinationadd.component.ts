import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientDetails } from '../models/PatientDetailsCommand';
import { customersListDto } from '../models/customersListDto';
import { CustomerService } from 'app/core/services/customers/customers.service';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-examinationadd',
  templateUrl: './examinationadd.component.html',
  styleUrls: ['./examinationadd.component.css']
})
export class ExaminationaddComponent implements OnInit {
  examinationForm: FormGroup;

  now: Date = new Date();
  patientList: PatientDetails[] = [];
  customers: customersListDto[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  selectedCustomerId: any;
  panelOpenState = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  announcer = inject(LiveAnnouncer);

  constructor(
    private _customerService: CustomerService,
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  ngOnInit() {

  }


  getCustomerList() {
    this._customerService.getcustomerlist().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getPatientList() {
    debugger
    this._customerService.getPatientsByCustomerId(this.customers[0].id).subscribe((response) => {
      this.patientList = response.data;
    });
  }


  examinationadd(): void {

  }

  handleValueChange(e) {

  }

  handleCustomerChange(event: any) {
    const model = {
      id: event.value
    }
    if (model.id == undefined) {
      model.id = event;
    }

    debugger;
    this._customerService.getPatientsByCustomerId(model).subscribe((response) => {
      this.patientList = response.data;
      if (this.patientList.length === 1) {
        this.examinationForm.get('patientId').patchValue(this.patientList[0].recId);
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


}
