import { Inject, Injectable, Logger } from '@nestjs/common';
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

    async getAllCategories(): Promise<ReportCategory[]> {
        this.logger.debug("Getting all categories");
        return await this.reportCategoryRepository.findAll();
    };

    async deactivateCategories(id: number): Promise<number> {
        this.logger.debug("Deactivating category");
        return await this.reportCategoryRepository.destroy({ where: { id: id } });
    };


}