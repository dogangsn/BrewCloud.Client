

export class AppointmentDto {
    id: string;
    customerId:string;
    doctorId: string;
    note:string;
    beginDate: string;
    endDate: string;
    appointmentType: number;
    text: string;
    isComplated: boolean;
    vaccineId: string;
    // constructor(
    //     customerId:string,
    //     doctorId: string,
    //     note:string,
    //     beginDate: string,
    //     endDate: string,
    //     ) {
    //     this.customerId = customerId;
    //     this.doctorId = doctorId;
    //     this.note = note;
    //     this.beginDate = beginDate;
    //     this.endDate = endDate;

    // }
}
