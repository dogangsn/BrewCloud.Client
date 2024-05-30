export class ExaminationDto {
    date: Date;
    status: string;
    customerId: string;
    patientId: string;
    bodyTemperature: number;
    pulse: number;
    respiratoryRate: number;
    weight: number;
    complaintStory: string;
    treatmentDescription: string;
    symptoms: string;
    // yapilanIslemler: string;

    constructor(
        date: Date,
        status: string,
        customerId: string,
        patientId: string,
        bodyTemperature: number,
        pulse: number,
        respiratoryRate: number,
        weight: number,
        complaintStory: string,
        treatmentDescription: string,
        symptoms: string,
        // yapilanIslemler: string
    ) {
        this.date = date;
        this.status = status;
        this.customerId = customerId;
        this.patientId = patientId;
        this.bodyTemperature = bodyTemperature;
        this.pulse = pulse;
        this.respiratoryRate = respiratoryRate;
        this.weight = weight;
        this.complaintStory = complaintStory;
        this.treatmentDescription = treatmentDescription;
        this.symptoms = symptoms;
        // this.yapilanIslemler = yapilanIslemler;
    }
}
