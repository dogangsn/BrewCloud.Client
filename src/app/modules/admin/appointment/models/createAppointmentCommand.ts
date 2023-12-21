 

export class CreateAppointmentCommand{
    beginDate : Date;
    doctorId : string;
    customerId : string;
    note : string;
    appointmentType : number;

    constructor(beginDate: Date,doctorId : string, customerId: string, note : string, appointmentType:number ){
        this.beginDate = beginDate;
        this.doctorId = doctorId;
        this.customerId = customerId;
        this.note = note;
        this.appointmentType = appointmentType;
    }

}