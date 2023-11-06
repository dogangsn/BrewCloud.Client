

export class AppointmentDto {
    customer:string;
    doctor: string;
    phoneNumber: number;
    eMail:string;
    vKNTCNo:string;
    note:string;
    appointmentDate: string;
    appointmentTime: string;

    constructor(
        customer:string,
        doctor: string,
        phoneNumber: number,
        eMail:string,
        vKNTCNo:string,
        note:string,
        appointmentDate: string,
        appointmentTime: string,
        ) {
        this.customer = customer;
        this.doctor = doctor;
        this.phoneNumber = phoneNumber;
        this.eMail = eMail;
        this.vKNTCNo = vKNTCNo;
        this.note = note;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;

    }
}
