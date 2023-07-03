import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'customeradd',
  templateUrl: './customeradd.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomeraddComponent implements OnInit {

  accountForm: UntypedFormGroup;
  
  constructor(private _formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.accountForm = this._formBuilder.group({
      name    : ['Brian Hughes']
  });
  }

}
