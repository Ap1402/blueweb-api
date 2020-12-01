import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action, CheckPolicies } from 'src/casl/constants';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { createCategoryDto } from './categories/category.dto';
import { ReportCategoryService } from './categories/reportCategory.service';
import { updateReportDto } from './report.dto';
import { ReportsService } from './reports.service';
import { ReportStatusService } from './statuses/reportStatusService';
import { createStatusDto } from './statuses/status.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService,
        private reportsCategoryService: ReportCategoryService,
        private reportsStatusService: ReportStatusService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createReport,
        @Request() req) {
        const { clientId } = req.user;
        return this.reportsService.createReport(createReport, clientId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return this.reportsService.getAll();
    }


    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getSelfClient(@Request() req) {
        const { clientId } = req.user;
        return this.reportsService.getByClient(clientId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':reportId')
    async update(@Body() updateDto: updateReportDto,
        @Param() params) {
        const { reportId } = params;
        return this.reportsService.updateReport(reportId, updateDto);
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

    @Get('/categories')
    async getCategories() {
        return this.reportsCategoryService.getAllCategories();
    }

    @Delete('/categories/:categoryId')
    async deleteCategory(@Param() params) {
        const { categoryId } = params;
        return this.reportsCategoryService.deactivateCategories(categoryId);
    }

    @Delete('/statuses/:statusId')
    async deleteStatus(@Param() params) {
        const { statusId } = params;
        return this.reportsStatusService.deactivateStatus(statusId);
    }

    @Get('/statuses')
    async getStatuses() {
        return this.reportsStatusService.getAllStatuses();
    }

    /*     @UseGuards(JwtAuthGuard, PoliciesGuard)
        @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadOwn, 'report'))
        @Get('/test')
        async test(@Request() req) {
            return this.reportsService.mock(req.user);
        } */




}

