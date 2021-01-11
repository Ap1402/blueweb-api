import { Accounts } from "./accounts/accounts.model";
import { PayoutReports } from "./payout-reports.model";

export const payoutReports = [
    {
        provide: 'PAYOUT_REPORTS_REPOSITORY',
        useValue: PayoutReports,
    },
    {
        provide: 'PAYOUT_REPORTS_ACCOUNTS_REPOSITORY',
        useValue: Accounts,
    },
];