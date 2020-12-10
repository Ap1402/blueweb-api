import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { getPagingData } from 'src/utils/paginationService';
import { ReportCategory } from '../categories/reportCategory.model';
import { Report } from '../report.model';
import { ReportComments } from './reportComments.model';
import { createCommentDto } from './comment.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class ReportCommentsService {
    private readonly logger = new Logger(ReportCommentsService.name);
    constructor(
        @Inject('REPORTS_REPOSITORY') private reportsRepository: typeof Report,
        @Inject('REPORTS_COMMENTS_REPOSITORY') private reportCommentsRepository: typeof ReportComments,
    ) { }

    async createComment(commentDto: createCommentDto, userId: number): Promise<ReportComments> {
        this.logger.debug("Creating new comment");
        const comment = await this.reportCommentsRepository.create({
            comment: commentDto.comment
        });

        await comment.$set('report', commentDto.reportId)
        await comment.$set('user', userId);
        return comment
    };

    async getCommmentsByReportId(reportId: number) {
        this.logger.debug("Creating new comment");
        const report = await this.reportsRepository.findByPk(reportId);

        const comments = await this.reportCommentsRepository.findAll({
            where: { reportId: report.id },
            include: [{ model: User, attributes: ['id', 'username'] }]
        });

        return comments
    };


    /*  async deactivateStatus(id: number): Promise<number> {
         this.logger.debug("Deleting status");
         return await this.reportComments.destroy({ where: { id: id } });
     };
 
     async getAllStatuses(condition, limit: number, offset: number, page: number) {
         this.logger.debug("Getting all statuses");
         const requests = await this.reportComments.findAndCountAll({
             where: condition,
             limit,
             offset
         });
         const response = getPagingData(requests, page, limit);
         return response;
     }; */


}