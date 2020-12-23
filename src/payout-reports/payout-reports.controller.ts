import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { getPagination } from 'src/utils/paginationService';
import { createPayoutReport } from './dto/create-payout-report.dto';
import { updatePayoutReport } from './dto/update-payout-report.dto';
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

    @Put('/:payoutId')
    @UseGuards(JwtAuthGuard)
    async changePayoutStatus(@Body() payoutStatus: updatePayoutReport, @Request() req, @Param() params) {
        const { userId } = req.user;
        const { payoutId } = params;
        return this.payoutReportsService.changePayoutStatus(userId, payoutId, payoutStatus)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllPayouts(@Query() query) {
        const { page, size, dni, client, orderBy, order, isApproved } = query;

        var condition = {};

        if (client) {
            condition = {
                ...condition,
                client: client
            }
        }
        if (dni) {
            condition = {
                ...condition,
                dni: dni
            }
        }
        if (isApproved) {
            condition = {
                ...condition,
                isApproved: isApproved
            }
        }
        condition = {
            ...condition,
            orderBy: orderBy ? orderBy : 'createdAt'
        }

        condition = {
            ...condition,
            order: order ? order : 'desc'
        }

        let { limit, offset } = getPagination(page, size);
        return this.payoutReportsService.getAllPayouts(condition, limit, offset, page);
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async getPayoutCurrentClient(@Request() req, @Query() query) {
        const { page, size, isApproved } = query;
        const { clientId } = req.user;
        var condition = {};
        let { limit, offset } = getPagination(page, size);
        condition = {
            ...condition,
            isApproved: isApproved ? isApproved : '0'
        }

        return this.payoutReportsService.getPayoutCurrentClient(condition, clientId, limit, offset, page);
    }

    @Get('/:payoutId')
    @UseGuards(JwtAuthGuard)
    async getPayoutById(@Query() query) {
        const { payoutId } = query;
        return this.payoutReportsService.getPayoutById(payoutId);
    }


}
