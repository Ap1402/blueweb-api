import { PayoutReports } from "./payout-reports.model";

export const payoutReports = [
    {
        provide: 'PAYOUT_REPORTS_REPOSITORY',
        useValue: PayoutReports,
    },
];