export class AccomodationListDto {
    customerName: string;
    roomName: string;
    roomId: string;
    customerId?: string | null;
    patientsId?: string | null;
    checkinDate: Date;
    checkoutDate: Date;
    accomodation: number;
    remark: string;
    createDate: Date;
    updateDate: Date;
    createusers: string;
    type: number;
    id: string;
}