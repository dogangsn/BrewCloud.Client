import { agendaTagsDto } from "./agendaTagsDto";

export class CreateAgendaCommand {
    agendano:number;
    agendatype: number;
    isactive: number;
    agendatitle:string;
    priority:string;
    notes:string;
    duedate: string;
    agendatags: agendaTagsDto[];

    constructor(
        agendano:number,
        agendatype: number,
        isactive: number,
        agendatitle:string,
        priority:string,
        notes:string,
        duedate: string,
        agendatags: agendaTagsDto[]) {
        this.agendano = agendano;
        this.agendatype = agendatype;
        this.agendatype = agendatype;
        this.isactive = isactive;
        this.agendatitle = agendatitle;
        this.priority = priority;
        this.notes = notes;
        this.duedate = duedate;
        this.agendatags = agendatags;


    }
}
