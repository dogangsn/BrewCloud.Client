export class CreateTitleCommand {
    name: string;
    remark: string;

    constructor(name: string, remark: string) {
        this.name = name;
        this.remark = remark;
    }
}