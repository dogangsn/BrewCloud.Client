export class UpdateTitleCommand {
    id : string;
    name: string;
    remark: string;
    constructor(id:string, name: string, remark: string) {
        this.id = id;
        this.name = name;
        this.remark = remark;
    }
}