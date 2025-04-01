import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'app/core/services/general/general.service';
import { SweetalertType } from 'app/modules/bases/enums/sweetalerttype.enum';
import { SweetAlertDto } from 'app/modules/bases/models/SweetAlertDto';
import { Gender } from '../../common/enums/Gender.enum';
import { BloopType } from '../../common/enums/BloopType.enum';
import { formatDate } from '@angular/common';
import { MemberService } from 'app/core/services/gym/member/member.service';

@Component({
  selector: 'app-memberadd',
  templateUrl: './memberadd.component.html',
  styleUrls: ['./memberadd.component.css']
})
export class MemberaddComponent implements OnInit {
  memberForm: FormGroup;
  genders: any[] = [];
  bloopTypes: any[] = [];
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _translocoService: TranslocoService,
    private _memberService: MemberService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.memberForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identityNumber: [''],
      isMember: [false],
      isMaried: [false],
      district: [''],
      job: [''],
      phone: ['', [Validators.required]],
      email: [''],
      address: [''],
      birthDate: [''],
      gender: [null],
      bloopType: [null],
      emergencyPerson: [''],
      emergencyPersonPhone: [''],
      note: [''],
      cardNumber: [''],
    });

    for (const n in Gender) {
      if (typeof Gender[n] === 'number') {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        this.genders.push({ id: <any>Gender[n], name: n });
      }
    }

    for (const n in BloopType) {
      if (typeof BloopType[n] === 'number') {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        this.bloopTypes.push({ id: <any>BloopType[n], name: n });
      }
    }
  }

  addMember(): any {
    if (this.memberForm.invalid) {
      this.showSweetAlert('error', 'Zorunlu Alanları Doldurunuz.');
      return;
    }

    if (!this.phoneNumberValidator(this.getFormValueByName('phone'))) {
      this.showSweetAlert(
        'error',
        'Telefon Numarası Alan Kodu Hatalı. Kontrol Ediniz.'
      );
      return;
    }
    let birthDate = null;
    if (this.getFormValueByName('birthDate') !== '') {
      birthDate = formatDate(this.getFormValueByName('birthDate'), 'yyyy-MM-dd', 'en-US');
    }

    const model = {
      firstName: this.getFormValueByName('firstName'),
      lastName: this.getFormValueByName('lastName'),
      phone: this.getFormValueByName('phone'),
      email: this.getFormValueByName('email'),
      identityNumber: this.getFormValueByName('identityNumber'),
      isMember: this.getFormValueByName('isMember'),
      isMaried: this.getFormValueByName('isMaried'),
      district: this.getFormValueByName('district'),
      job: this.getFormValueByName('job'),
      address: this.getFormValueByName('address'),
      birthDate: birthDate,
      gender: this.getFormValueByName('gender'),
      bloopType: this.getFormValueByName('bloopType'),
      emergencyPerson: this.getFormValueByName('emergencyPerson'),
      emergencyPersonPhone: this.getFormValueByName('emergencyPersonPhone'),
      note: this.getFormValueByName('note'),
      cardNumber: this.getFormValueByName('cardNumber'),
    };
    this._memberService.createMember(model).subscribe(
      (response) => {
        if (response.isSuccessful) {
          const sweetAlertDto = new SweetAlertDto(
            'Kayıt İşlemi Gerçekleşti',
            'Üye Listesi Ekranına Yönlendirilmek İster Misiniz?',
            SweetalertType.success
          );
          GeneralService.sweetAlertOfQuestion(sweetAlertDto).then(
            (swalResponse) => {
              if (swalResponse.isConfirmed) {
                this.router.navigate([
                  'member/memberlist',
                  response.data,
                ]);
              }
            }
          );
          this.memberForm.reset();
        } else {

          this.showSweetAlert('error', response.errors[0]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFormValueByName(formName: string): any {
    return this.memberForm.get(formName).value;
  }

  showSweetAlert(type: string, text: string): void {
    if (type === 'success') {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.success'),
        this.translate(text),
        SweetalertType.success
      );
      GeneralService.sweetAlert(sweetAlertDto);
    } else {
      const sweetAlertDto = new SweetAlertDto(
        this.translate('sweetalert.error'),
        this.translate(text),
        SweetalertType.error
      );
      GeneralService.sweetAlert(sweetAlertDto);
    }
  }

  translate(key: string): any {
    return this._translocoService.translate(key);
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
    this.memberForm.get(formControlName).setValue(formattedValue);
  }

  phoneNumberValidator(phoneNumber: any): boolean {

    const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/; // İstenen telefon numarası formatı
    const validAreaCodes = [
      '(505)',
      '(506)',
      '(507)',
      '(551)',
      '(552)',
      '(553)',
      '(554)',
      '(555)',
      '(556)',
      '(557)',
      '(558)',
      '(559)',
      '(501)',
      '(502)',
      '(503)',
      '(504)',
      '(540)',
      '(541)',
      '(542)',
      '(543)',
      '(544)',
      '(545)',
      '(546)',
      '(547)',
      '(548)',
      '(549)',
      '(530)',
      '(531)',
      '(532)',
      '(533)',
      '(534)',
      '(535)',
      '(536)',
      '(537)',
      '(538)',
      '(539)',
      '(501)',
      '(502)',
      '(503)',
      '(504)',
      '(505)',
      '(506)',
      '(507)',
    ];
    
    const inputAreaCode = phoneNumber.substring(0, 5); // Telefon numarasından alan kodunu al

    if (!validAreaCodes.includes(inputAreaCode)) {
      return false; // Geçersiz alan kodu hatası
    }
    return true;
  }

  onlyAllowNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

}
