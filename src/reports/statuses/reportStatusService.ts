import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { getPagingData } from 'src/utils/paginationService';
import { ReportCategory } from '../categories/reportCategory.model';
import { Report } from '../report.model';
import { ReportStatus } from './reportStatus.model';
import { createStatusDto } from './status.dto';

@Injectable()
export class ReportStatusService {
    private readonly logger = new Logger(ReportStatusService.name);
    constructor(
        @Inject('REPORTS_REPOSITORY') private reportsRepository: typeof Report,
        @Inject('REPORTS_STATUS_REPOSITORY') private reportStatusRepository: typeof ReportStatus,
    ) { }

    async createStatus(statusDto: createStatusDto): Promise<ReportStatus> {
        this.logger.debug("Creating new Status");
        return await this.reportStatusRepository.create(statusDto);
    };

    async deactivateStatus(id: number): Promise<number> {
        this.logger.debug("Deleting status");
        return await this.reportStatusRepository.destroy({ where: { id: id } });
    };

    async getAllStatuses(condition, limit: number, offset: number, page: number) {
        this.logger.debug("Getting all statuses");
        const requests = await this.reportStatusRepository.findAndCountAll({
            where: condition,
            limit,
            offset
        });
        const response = getPagingData(requests, page, limit);
        return response;
    };


}