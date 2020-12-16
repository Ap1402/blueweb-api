import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createPayoutReport } from './dto/create-payout-report.dto';
import { PayoutReportsService } from './payout-reports.service';

@Controller('payout-reports')
export class PayoutReportsController {
    constructor(private payoutReportsService: PayoutReportsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createPayoutReport: createPayoutReport, @Request() req) {
        const { clientId } = req.user;
        return this.payoutReportsService.create(createPayoutReport, clientId)
    }
}
