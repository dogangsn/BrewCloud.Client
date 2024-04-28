export class VaccineListDto {
    animalTypeName: string;
    vaccineName: string;
    timeDone: number; // Ne zaman yapılacak
    renewalOption: string; // Yenileme Seçeneği (Guid yerine string kullanıldı)
    price : string;
    animalType: number;
}