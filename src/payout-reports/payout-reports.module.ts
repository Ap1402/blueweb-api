import { Module } from '@nestjs/common';
import { PayoutReportsService } from './payout-reports.service';
import { PayoutReportsController } from './payout-reports.controller';
import { payoutReports } from './payout-reports.providers';

@Module({
  providers: [PayoutReportsService, ...payoutReports],
  controllers: [PayoutReportsController]
})
export class PayoutReportsModule { }
