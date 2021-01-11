import { Module } from '@nestjs/common';
import { PayoutReportsService } from './payout-reports.service';
import { PayoutReportsController } from './payout-reports.controller';
import { payoutReports } from './payout-reports.providers';
import { AccountsService } from './accounts/accounts.service';

@Module({
  providers: [PayoutReportsService, ...payoutReports, AccountsService],
  controllers: [PayoutReportsController]
})
export class PayoutReportsModule { }
