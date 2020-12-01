import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { getPagination } from 'src/utils/paginationService';
import { createFactibilityDto } from './dto/create-factibility.dto';
import { FactibilityRequestsService } from './factibility-requests.service';

@Controller('factibility-requests')
export class FactibilityRequestsController {
    constructor(private factibilityRequestsService: FactibilityRequestsService) { }

    @Post()
    async create(@Body() createDto: createFactibilityDto) {
        return this.factibilityRequestsService.create(createDto)
    }

    @Get()
    async getAll(@Param() params) {
        const { page, size } = params;
        const condition = null;

        let { limit, offset } = getPagination(page, size);

        return this.factibilityRequestsService.getAllRequests(condition, limit, offset, page)
    }

    @Get(':requestId')
    async getRequestById(@Param() params) {
        const { requestId } = params;
        return this.factibilityRequestsService.getRequestById(requestId)
    }

    @Get('/count')
    async countRequests(@Query() query) {
        const { pending } = query;
        return this.factibilityRequestsService.count(pending)
    }

    @Put(':requestId')
    async updateRequest(@Body() updateRequestDto: createFactibilityDto, @Param() params) {
        const { requestId } = params;
        return this.factibilityRequestsService.update(requestId, updateRequestDto)
    }
}
