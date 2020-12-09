import { Inject, Injectable, Logger } from '@nestjs/common';
import { getPagination, getPagingData } from 'src/utils/paginationService';
import { ReportCategory } from '../categories/reportCategory.model';
import { Report } from '../report.model';
import { createCategoryDto } from './category.dto';

@Injectable()
export class ReportCategoryService {
    private readonly logger = new Logger(ReportCategoryService.name);
    constructor(
        @Inject('REPORTS_REPOSITORY') private reportsRepository: typeof Report,
        @Inject('REPORTS_CATEGORY_REPOSITORY') private reportCategoryRepository: typeof ReportCategory,
    ) { }

    async createCategory(categoryDto: createCategoryDto): Promise<ReportCategory> {
        this.logger.debug("Creating new category");
        return await this.reportCategoryRepository.create(categoryDto);
    };

    async getAllCategories(condition, limit: number, offset: number, page: number, paranoid: boolean) {
        this.logger.debug("Getting all categories");
        const requests = await this.reportCategoryRepository.findAndCountAll({
            where: condition,
            limit,
            offset,
            paranoid
        });
        const response = getPagingData(requests, page, limit);
        return response;
    };

    async deactivateCategories(id: number): Promise<number> {
        this.logger.debug("Deleting category");
        return await this.reportCategoryRepository.destroy({ where: { id: id } });
    };


}