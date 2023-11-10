import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  parameters: UntypedFormGroup;
  days: string[] = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  selectedDays = new FormControl([]);
  allselectcheck: string ="Tümünü Seç";
  checkAllSelect: boolean = false;
  constructor(
    private _formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.parameters = this._formBuilder.group({
      appointmentReminderDuration : [0],
      smsCompany : [""],
      agendaNoteReminder : [0],
      otoSms     : [false],
      displayVetNo      : [false],
      days       : [[]],
      cashAccount      : [""],
      creditCardCashAccount : [""],
      bankTransferCashAccount : [""],
      whatsappTemplate : [""],
      customerWelcomeTemplate : [""],
      isOtoCustomerWelcomeMessage : [""],
      automaticAppointmentReminderMessageTemplate : [false]
  });
  }
  onSmsCompanySelectionChange(event: any): void {
    // const selectedProductId = event.value; // Seçilen ürünün id değeri
    //  const selectedProducts = this.productdescription.find(product => product.id === selectedProductId);
    // var total = (selectedProducts.buyingIncludeKDV !== true ?  selectedProducts.buyingPrice * (1 + (selectedProducts.ratio/100) ) : selectedProducts.buyingPrice);
    // var vatSumCalc =  total * (1 + (selectedProducts.ratio/100));
    // var vatSum = vatSumCalc - total;
    // if (selectedProducts) {
    //     this.selectedProductForm.patchValue({
            
    //         productId: selectedProductId,
    //         barcode: selectedProducts.productBarcode,
    //         isActive: (selectedProducts.active === true ? 1 : 0),
            
    //         unitPrice: selectedProducts.buyingPrice,
    //         stockState: 0,
    //          reserved: 0,
    //          amount : 0
    //     });
    //     this.selectedProduct.isActive = selectedProducts.active == true ? 1 : 0;
        
    //    // this.selectedProduct.isActive
    //    //this.selectedProductForm.get('isActive').value === selectedProducts.active == true ? 1 : 0;
    //     this.quantityAdet = selectedProducts.id;
    // }
}
oncashAccountSelectionChange(event: any): void {

}
oncreditCardCashAccountSelectionChange(event: any): void {

}
onbankTransferCashAccountSelectionChange(event: any): void {

}
onwhatsappTemplateSelectionChange(event: any): void {

}
oncustomerWelcomeTemplateSelectionChange(event: any): void {

}
onautomaticAppointmentReminderMessageTemplateSelectionChange(event: any): void {

}

selectAllDays(event: any) {
 const ss = event.value;
debugger;
if(this.allselectcheck == "Tümünü Kaldır")
{
  this.checkAllSelect = false;
  this.selectedDays.setValue([]);
  this.allselectcheck = "Tümünü Seç"
  
}
else{
  this.checkAllSelect = true;
  this.allselectcheck = "Tümünü Kaldır"
  // this.selectedDays.setValue([this.allselectcheck]);
  this.selectedDays.setValue(this.days);
}
  
}

}
