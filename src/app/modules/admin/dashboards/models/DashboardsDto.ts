export class DashboardsDto {
    totalCount: DashboardCountTotal;
}

export class DashboardCountTotal {
    dailyAddAppointmentCount: number;
    dailyAddAppointmentCompletedCount: number;
    dailyAddCustomerCount: number;
    DailyAddCustomerYestardayCount: number;
    dailyTurnoverAmount: number;
    dailyTurnoverPreviousAmount: number;
    totalStockAmount: number;
}



