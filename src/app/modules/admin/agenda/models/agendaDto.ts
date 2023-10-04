import { agendaTagsDto } from "./agendaTagsDto";

export class agendaDto {
    id: string;
    agendano:number;
    agendatype: number;
    isactive: number;
    agendatitle:string;
    priority:string;
    notes:string;
    duedate: string;
    agendaTags: agendaTagsDto[];
}