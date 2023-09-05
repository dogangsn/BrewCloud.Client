import { Component, OnInit } from '@angular/core';
import { PaymentMethodsDto } from '../../definition/paymentmethods/models/PaymentMethodsDto';
import { PaymentMethodservice } from 'app/core/services/definition/paymentmethods/paymentmethods.service';

@Component({
  selector: 'app-cashtransactions',
  templateUrl: './cashtransactions.component.html',
  styleUrls: ['./cashtransactions.component.css']
})
export class CashtransactionsComponent implements OnInit {


  payments: PaymentMethodsDto[] = [];

  constructor( private _paymentmethodsService : PaymentMethodservice) { }

  ngOnInit() {
    this.paymentsList();
  }


 




  paymentsList() {
    this._paymentmethodsService.getPaymentMethodsList().subscribe((response) => {
        this.payments = response.data;
        console.log(this.payments);
    });
}
}
