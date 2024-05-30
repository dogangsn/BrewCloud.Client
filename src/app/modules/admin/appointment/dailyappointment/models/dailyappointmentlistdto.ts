import { DateTime } from "luxon";

export class DailyAppointmentListDto {
    id:string;
    date: DateTime;
    customerPatientName: string;
    services: string;
    status : string;
    statusName : string;
}