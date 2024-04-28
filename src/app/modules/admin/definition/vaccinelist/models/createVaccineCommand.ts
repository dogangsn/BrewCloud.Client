import { VaccineMedicine } from "./VaccineMedicine";

export class CreateVaccineCommand{
    animalType: number;
    vaccineName: string;
    timeDone: number;
    renewalOption: string;  
    obligation: number;
    vaccineType: number;
    vaccineMedicine : VaccineMedicine[];
}