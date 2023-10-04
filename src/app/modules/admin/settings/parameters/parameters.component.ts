import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  parameters: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.parameters = this._formBuilder.group({
      name    : [''],
      username: [''],
      title   : [''],
      company : [''],
      about   : [''],
      email   : ['hughes.brian@mail.com', Validators.email],
      phone   : ['121-490-33-12'],
      country : ['usa'],
      language: ['english'],
      communication: [true],
      security     : [true],
      meetups      : [false],
      comments     : [false],
      mention      : [true],
      follow       : [true],
      inquiry      : [true]
  });
  }

}
