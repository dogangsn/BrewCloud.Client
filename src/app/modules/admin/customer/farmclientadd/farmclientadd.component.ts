import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-farmclientadd',
  templateUrl: './farmclientadd.component.html',
  styleUrls: ['./farmclientadd.component.css']
})
export class FarmclientaddComponent implements OnInit {

  horizontalStepperForm: UntypedFormGroup;
  
  constructor(private _formBuilder: UntypedFormBuilder) { }

  ngOnInit() {

    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
          email   : ['', [Validators.required]],
          country : ['', Validators.required],
          language: ['', Validators.required]
      }),
      step2: this._formBuilder.group({
          firstName: ['', Validators.required],
          lastName : ['', Validators.required],
          userName : ['', Validators.required],
          about    : ['']
      }),
      step3: this._formBuilder.group({
          byEmail          : this._formBuilder.group({
              companyNews     : [true],
              featuredProducts: [false],
              messages        : [true]
          }),
          pushNotifications: ['everything', Validators.required]
      })
  });


  }

}
