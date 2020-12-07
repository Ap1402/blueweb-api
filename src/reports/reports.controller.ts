import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action, CheckPolicies } from 'src/casl/constants';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { JoiValidationPipe } from 'src/utils/JoiValidationPipe';
import { getPagination } from 'src/utils/paginationService';
import { createCategoryDto } from './categories/category.dto';
import { ReportCategory } from './categories/reportCategory.model';
import { ReportCategoryService } from './categories/reportCategory.service';
import { updateReportDto } from './report.dto';
import { Report } from './report.model';
import { ReportsService } from './reports.service';
import { ReportStatusService } from './statuses/reportStatusService';
import { createStatusDto } from './statuses/status.dto';
import { ReportSchema, StatusCategoryValidator } from './validators/reports.validator';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService,
        private reportsCategoryService: ReportCategoryService,
        private reportsStatusService: ReportStatusService,
    ) { }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.CreateOwn, 'report'))
    @Post()
    async create(@Body(new JoiValidationPipe(ReportSchema, { update: false })) createReport,
        @Request() req): Promise<Report> {
        const { clientId } = req.user;
        return this.reportsService.createReport(createReport, clientId);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadAny, 'report'))
    @Get()
    async getAll(@Query() query) {
        const { page, size } = query;
        const condition = null;
        let { limit, offset } = getPagination(page, size);
        return this.reportsService.getAll(condition, limit, offset, page);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadOwn, 'report'))
    @Get('/me')
    async getSelfClient(@Request() req, @Query() query) {
        const { page, size } = query;
        let { limit, offset } = getPagination(page, size);
        const { clientId } = req.user;
        return this.reportsService.getByClient(limit, offset, page, clientId);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'reportCategory'))
    @Post('/categories')
    async createCategory(@Body(new JoiValidationPipe(StatusCategoryValidator, { category: true })) createCategory: createCategoryDto) {
        return this.reportsCategoryService.createCategory(createCategory);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'reportStatus'))
    @Post('/statuses')
    async createStatus(@Body(new JoiValidationPipe(StatusCategoryValidator, { category: false })) createStatus: createStatusDto) {
        return this.reportsStatusService.createStatus(createStatus);
    }

    @Get('/categories')
    async getCategories(@Query() query) {
        const page: number = query.page;
        const size: number = query.size;
        const condition = null;
        let { limit, offset } = getPagination(page, size);
        return this.reportsCategoryService.getAllCategories(condition, limit, offset, page);
    }

    @Get('/statuses')
    async getStatuses(@Query() query) {
        const page: number = query.page;
        const size: number = query.size;
        const condition = null;
        let { limit, offset } = getPagination(page, size);
        return this.reportsStatusService.getAllStatuses(condition, limit, offset, page);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'reportStatus'))
    @Delete('/categories/:categoryId')
    async deleteCategory(@Param() params): Promise<number> {
        const { categoryId } = params;
        return this.reportsCategoryService.deactivateCategories(categoryId);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'reportStatus'))
    @Delete('/statuses/:statusId')
    async deleteStatus(@Param() params): Promise<number> {
        const { statusId } = params;
        return this.reportsStatusService.deactivateStatus(statusId);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.UpdateAny, 'reportStatus'))
    @Put(':reportId')
    async update(@Body(new JoiValidationPipe(ReportSchema, { update: true })) updateDto: updateReportDto,
        @Param() params): Promise<Report> {
        const { reportId } = params;
        return this.reportsService.updateReport(reportId, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':reportId')
    async getById(@Param() param): Promise<Report> {
        const { reportId } = param;
        return this.reportsService.getById(reportId);
    }

    /*     @UseGuards(JwtAuthGuard, PoliciesGuard)
        @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadOwn, 'report'))
        @Get('/test')
        async test(@Request() req) {
            return this.reportsService.mock(req.user);
        } */




}

