export class ExaminationListDto {
    id: string;
    date: Date;
    // muayneDurumu: string;
    customerName: string;
    patientName: string;
    weight: number;
    symptoms: string;
    complaintStory: string;
    treatmentDescription: string;

    // constructor(
    //     id: string,
    //     muayeneTarihi: Date,
    //     muayneDurumu: string,
    //     customerId: string,
    //     patientId: string,
    //     weight: number,
    //     semptomlar: string,
    //     complaintAndHistory: string,
    //     treatmentDescription: string,
    // ) {
    //     this.id = id;
    //     this.muayeneTarihi = muayeneTarihi;
    //     this.muayneDurumu = muayneDurumu;
    //     this.customerId = customerId;
    //     this.patientId = patientId;
    //     this.weight = weight;
    //     this.semptomlar = semptomlar;
    //     this.complaintAndHistory = complaintAndHistory;
    //     this.treatmentDescription = treatmentDescription;
    // }
}
