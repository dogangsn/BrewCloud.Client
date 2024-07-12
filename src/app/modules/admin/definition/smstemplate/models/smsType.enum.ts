export enum SmsType {
    Customer = 1,
    Patient = 2,
    Accomodation = 3,
    Appointment = 4
  }


  export const SmsTypeDisplay: { [key in SmsType]: string } = {
    [SmsType.Customer]: 'Müşteri',
    [SmsType.Patient]: 'Hasta',
    [SmsType.Accomodation]: 'Konaklama',
    [SmsType.Appointment] : 'Randevu' 
 
  };