import {Inject, Injectable, Logger } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
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

    async getAllStatuses(): Promise<ReportStatus[]> {
        this.logger.debug("Creating new Status");
        return await this.reportStatusRepository.findAll();
    };

    async deactivateStatus(id: number): Promise<ReportStatus> {
        this.logger.debug("Creating new Status");
        return await this.reportStatusRepository.findByPk(id);
    };


}