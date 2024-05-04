export class ExaminationDto {
    muayeneTarihi: Date;
    muayneDurumu: string;
    customerId: string;
    patientId: string;
    bodyTemperature: number;
    pulse: number;
    respiratoryRate: number;
    weight: number;
    complaintAndHistory: string;
    treatmentDescription: string;
    semptomlar: string;
    // yapilanIslemler: string;

    constructor(
        muayeneTarihi: Date,
        muayneDurumu: string,
        customerId: string,
        patientId: string,
        bodyTemperature: number,
        pulse: number,
        respiratoryRate: number,
        weight: number,
        complaintAndHistory: string,
        treatmentDescription: string,
        semptomlar: string,
        // yapilanIslemler: string
    ) {
        this.muayeneTarihi = muayeneTarihi;
        this.muayneDurumu = muayneDurumu;
        this.customerId = customerId;
        this.patientId = patientId;
        this.bodyTemperature = bodyTemperature;
        this.pulse = pulse;
        this.respiratoryRate = respiratoryRate;
        this.weight = weight;
        this.complaintAndHistory = complaintAndHistory;
        this.treatmentDescription = treatmentDescription;
        this.semptomlar = semptomlar;
        // this.yapilanIslemler = yapilanIslemler;
    }
}
