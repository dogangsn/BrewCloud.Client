import { DateTime } from "luxon";

export class DailyAppointmentListDto {
    date: DateTime;
    customerPatientName: string;
    services: string;
    status : string;
}