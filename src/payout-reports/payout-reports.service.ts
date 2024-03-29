import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { check } from 'prettier';
import { Op } from 'sequelize';
import { Client } from 'src/clients/client.model';
import { User } from 'src/users/user.model';
import { getPagingData } from 'src/utils/paginationService';
import { Accounts } from './accounts/accounts.model';
import { createPayoutReport } from './dto/create-payout-report.dto';
import { updatePayoutReport } from './dto/update-payout-report.dto';
import { PayoutReports } from './payout-reports.model';

@Injectable()
export class PayoutReportsService {

    private readonly logger = new Logger(PayoutReportsService.name);

    constructor(
        @Inject('PAYOUT_REPORTS_REPOSITORY') private payoutReportsRepository: typeof PayoutReports) { }

    async create(createPayoutReport: createPayoutReport, clientId: number) {
        this.logger.debug('Creating new payout report')
        const result = await this.payoutReportsRepository.create(createPayoutReport);
        await result.$set('bankDestiny', createPayoutReport.bankDestiny)
        await result.$set('client', clientId)
        return result
    }

    async getPayoutById(payoutId: number) {
        this.logger.debug('Getting report by id')
        const payout = await this.payoutReportsRepository.findByPk(payoutId);
        return payout
    }

    async getPayoutCurrentClient(condition, clientId: number, limit: number, offset: number, page: number) {
        this.logger.debug('Getting report for current client')
        var where = {}

        if (condition.isApproved) {
            where = {
                ...where,
                isApproved: condition.isApproved
            }
        }

        where = {
            ...where,
            clientId: clientId
        }

        const payouts = await this.payoutReportsRepository.findAndCountAll({
            where: where,
            limit,
            offset
        });
        const response = getPagingData(payouts, page, limit);

        return response
    }


    async changePayoutStatus(userId: number, payoutId: number, payoutStatus: updatePayoutReport) {
        this.logger.debug('Approving payout')
        const payout = await this.payoutReportsRepository.findByPk(payoutId);
        payout.isApproved = parseInt(payoutStatus.isApproved) ? true : false;
        const checkCommerceCode = await this.payoutReportsRepository.findOne({
            where: {
                commerceCode: {
                    [Op.and]: {
                        [Op.not]: '',
                        [Op.eq]: payoutStatus.commerceCode
                    }
                },
                id: { [Op.not]: payoutId }
            }
        })
        if (checkCommerceCode) {
            throw new HttpException('Este número de recibo ya está asignado al reporte de pago número ' + checkCommerceCode.id, HttpStatus.CONFLICT);
        }
        if (payout.isApproved) {
            payout.approvedAt = new Date();
            payout.commerceCode = payoutStatus.commerceCode;
        } else {
            payout.commerceCode = '';
        }
        payout.$set('user', userId)
        return await payout.save();
    }


    async getAllPayouts(condition, limit: number, offset: number, page: number) {
        this.logger.debug('Getting all payouts')
        var where = {}

        if (condition.client) {
            where = {
                ...where,
                [Op.or]: [{
                    '$client.names$': {
                        [Op.like]: `%${condition.client}%`
                    }
                }, {
                    '$client.lastNames$': {
                        [Op.like]: `%${condition.client}%`
                    }
                }]
            }
        }

        if (condition.dni) {
            where = {
                ...where,
                '$client.dni$': {
                    [Op.like]: `${condition.dni}%`
                }
            }
        }

        if (condition.isApproved) {
            where = {
                ...where,
                isApproved: condition.isApproved
            }
        }

        const payouts = await this.payoutReportsRepository.findAndCountAll({
            order: [
                [condition.orderBy, condition.order],
            ],
            where,
            limit,
            offset,
            include: [{
                model: Client, attributes: ['id', 'names', 'lastNames', 'dni']
            }, { model: User, attributes: ['username'] }, {
                model: Accounts, attributes: ['bankName'], paranoid: false

            }],
        });
        const response = getPagingData(payouts, page, limit);
        return response;
    }

}
