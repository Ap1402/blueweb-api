import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action, CheckPolicies } from 'src/casl/constants';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { getPagination } from 'src/utils/paginationService';
import { ContactMessagesService } from './contact-messages.service';
import { createMessageDto } from './dto/createMessage.dto';
import { ContactMessagesReasonsService } from './reasons/contactMessagesReasons.service';
import { createReason } from './reasons/reason.dto';

@Controller('contact-messages')
export class ContactMessagesController {
    constructor(private contactMessagesService: ContactMessagesService,
        private contactMessagesReasonsService: ContactMessagesReasonsService,
    ) { }

    @Post()
    async create(@Body() createMessageDto: createMessageDto) {
        return this.contactMessagesService.create(createMessageDto)
    }

    /*  @UseGuards(JwtAuthGuard, PoliciesGuard)
     @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadAny, 'contactMessage')) */

    @Get()
    async getAll(@Query() query) {
        const { page, size, wasAnswered, dni } = query;
        var condition = {};
        if (wasAnswered) {
            condition = {
                ...condition,
                wasAnswered: wasAnswered
            }
        }
        if (dni) {
            condition = {
                ...condition,
                dni: dni
            }
        }
        let { limit, offset } = getPagination(page, size);
        return this.contactMessagesService.getAll(condition, limit, offset, page);
    }

    @Get('/count')
    async countMessages(@Query() query) {
        const answered = query.answered ? query.answered : false;
        return this.contactMessagesService.countMessages(answered)
    }

    @Put(':messageId')
    async update(@Body() createMessageDto: createMessageDto, @Param() params,
    ) {
        const { messageId } = params;
        return this.contactMessagesService.update(messageId, createMessageDto)
    }

    @Post('/reasons')
    async createReason(@Body() createReasonDto: createReason) {
        return this.contactMessagesReasonsService.createReason(createReasonDto)
    }

    @Get('/reasons')
    async getReasons() {
        return this.contactMessagesReasonsService.getReasons()
    }
}
