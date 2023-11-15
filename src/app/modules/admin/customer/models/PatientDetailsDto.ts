export class PatientDetailsDto {
    recId: string;
    name: string;
    sex: number;
    animalColor: string;
    animalType: string;
    birthDate: string;
    breedType: string;
    chipNumber: string;
    customerId: string;

    constructor(
        recId: string,
        name: string,
        sex: number,
        animalColor: string,
        animalType: string,
        birthDate: string,
        breedType: string,
        chipNumber: string,
        customerId: string
    ) {
        this.recId = recId;
        this.name = name;
        this.sex = sex;
        this.animalColor = animalColor;
        this.animalType = animalType;
        this.birthDate = birthDate;
        this.breedType = breedType;
        this.chipNumber = chipNumber;
        this.customerId = customerId;
    }
}
