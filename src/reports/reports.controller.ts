import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createCategoryDto } from './categories/category.dto';
import { ReportCategoryService } from './categories/reportCategory.service';
import { ReportsService } from './reports.service';
import { ReportStatusService } from './statuses/reportStatusService';
import { createStatusDto } from './statuses/status.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService,
        private reportsCategoryService: ReportCategoryService,
        private reportsStatusService: ReportStatusService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createReport,
        @Request() req) {
        const { clientId } = req.user;
        return this.reportsService.createReport(createReport, clientId);
    }


    @UseGuards(JwtAuthGuard)
    @Post('/categories')
    async createCategory(@Body() createCategory: createCategoryDto) {
        return this.reportsCategoryService.createCategory(createCategory);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/statuses')
    async createStatus(@Body() createStatus: createStatusDto) {
        return this.reportsStatusService.createStatus(createStatus);
    }



}

