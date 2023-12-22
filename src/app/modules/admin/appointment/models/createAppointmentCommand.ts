import { addVaccineDto } from "./addVaccineDto";

 

export class CreateAppointmentCommand{
    beginDate : Date;
    doctorId : string;
    customerId : string;
    note : string;
    appointmentType : number;
    vaccineItems: addVaccineDto[];

    constructor(beginDate: Date,doctorId : string, customerId: string, note : string, appointmentType:number,  vaccineItems: addVaccineDto[]){
        this.beginDate = beginDate;
        this.doctorId = doctorId;
        this.customerId = customerId;
        this.note = note;
        this.appointmentType = appointmentType;
        this.vaccineItems = vaccineItems;
    }

}