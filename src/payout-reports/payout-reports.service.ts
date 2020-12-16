import { Inject, Injectable, Logger } from '@nestjs/common';
import { createPayoutReport } from './dto/create-payout-report.dto';
import { PayoutReports } from './payout-reports.model';

@Injectable()
export class PayoutReportsService {

    private readonly logger = new Logger(PayoutReportsService.name);

    constructor(
        @Inject('PAYOUT_REPORTS_REPOSITORY') private payoutReportsRepository: typeof PayoutReports) { }

    async create(createPayoutReport: createPayoutReport, clientId: number) {
        this.logger.debug('Creating new payout report')
        const result = await this.payoutReportsRepository.create(createPayoutReport);
        await result.$set('client', clientId)
        return result
    }

}
