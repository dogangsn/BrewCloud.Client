export class CreateCasingDefinitionCommand {
    kasa: string;
    durumu: boolean;

    constructor(kasa: string, durumu: boolean) {
        this.kasa = kasa;
        this.durumu = durumu;
    }
}
