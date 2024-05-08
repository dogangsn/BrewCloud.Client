import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.scss']
})
export class PatientdetailsComponent implements OnInit {
  @Output() formDataChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
