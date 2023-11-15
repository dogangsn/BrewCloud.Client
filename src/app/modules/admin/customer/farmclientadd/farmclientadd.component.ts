import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditPatientsDialogComponent } from '../customerlist/patientsdialogs/create-edit-patients';

@Component({
    selector: 'app-farmclientadd',
    templateUrl: './farmclientadd.component.html',
    styleUrls: ['./farmclientadd.component.css'],
})
export class FarmclientaddComponent implements OnInit {
    horizontalStepperForm: UntypedFormGroup;
    items = [
        {
          title: 'Öğe 1',
          description: 'Bu, kart listesinin birinci öğesi.'
        },
        {
          title: 'Öğe 2',
          description: 'Bu, kart listesinin ikinci öğesi.'
        },
        {
          title: 'Öğe 3',
          description: 'Bu, kart listesinin üçüncü öğesi.'
        },
        {
            title: 'Öğe 4',
            description: 'Bu, kart listesinin üçüncü öğesi.'
          },
          {
            title: 'Öğe 5',
            description: 'Bu, kart listesinin üçüncü öğesi.'
          },
          {
            title: 'Öğe 6',
            description: 'Bu, kart listesinin üçüncü öğesi.'
          }
        // Buraya istediğiniz kadar öğe ekleyebilirsiniz
      ];

    constructor(private _formBuilder: UntypedFormBuilder,  
                private _dialog: MatDialog) 
    {

    }

    ngOnInit() {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                farmName : ['', [Validators.required]],
                farmContact : ['', Validators.required],
                farmRelationship : ['',Validators.required],
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', Validators.required],
                phoneNumber: [''],
                note: [''],
            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });
    }


    formatPhoneNumber(inputValue: string, formControlName: string): void {
        // Sadece sayıları alarak filtreleme yapın
        const numericValue = inputValue.replace(/\D/g, '');

        // Sayıları uygun formatta düzenle
        let formattedValue = '';
        if (numericValue.length > 0) {
            formattedValue += '(' + numericValue.substring(0, 3) + ')';
        }
        if (numericValue.length > 3) {
            formattedValue += ' ' + numericValue.substring(3, 6);
        }
        if (numericValue.length > 6) {
            formattedValue += '-' + numericValue.substring(6, 10);
        }

        // Düzenlenmiş değeri input alanına atayın
        this.horizontalStepperForm.get(formControlName).setValue(formattedValue);
    }

    addPanelOpen(): void {
        //this.erpfinancemonitorForm.reset();
        const dialog = this._dialog
            .open(CreateEditPatientsDialogComponent, {
                // maxWidth: '400vw !important',
                // minHeight: '2000px !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                    // debugger;
                    // response.data.forEach(item => {
                    //     this.patients.push(item);
                    // });
                    // this.dataSource = new MatTableDataSource(this.patients);
                }
            });
    }
    
}
