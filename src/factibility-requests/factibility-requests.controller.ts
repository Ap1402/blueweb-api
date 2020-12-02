import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/JoiValidationPipe';
import { getPagination } from 'src/utils/paginationService';
import { createFactibilityDto } from './dto/create-factibility.dto';
import { FactibilityRequestsService } from './factibility-requests.service';
import { FacitibilityRequestSchema } from './validators/factibility.validator';

@Controller('factibility-requests')
export class FactibilityRequestsController {
    constructor(private factibilityRequestsService: FactibilityRequestsService) { }

    @Post()
    async create(@Body(new JoiValidationPipe(FacitibilityRequestSchema, { create: true })) createDto: createFactibilityDto) {
        return this.factibilityRequestsService.create(createDto)
    }

    @Get()
    async getAll(@Param() params) {
        const { page, size } = params;
        const condition = null;

        let { limit, offset } = getPagination(page, size);

        return this.factibilityRequestsService.getAllRequests(condition, limit, offset, page)
    }

    @Get('/count')
    async countRequests(@Query() query) {
        const { pending } = query;
        const condition = pending ? { pending: pending } : null;
        return this.factibilityRequestsService.count(condition)
    }

    @Get(':requestId')
    async getRequestById(@Param() params) {
        const { requestId } = params;
        return this.factibilityRequestsService.getRequestById(requestId)
    }


    @Put(':requestId')
    async updateRequest(@Body() updateRequestDto: createFactibilityDto, @Param() params) {
        const { requestId } = params;
        return this.factibilityRequestsService.update(requestId, updateRequestDto)
    }
}
