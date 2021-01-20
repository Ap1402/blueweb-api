import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action, CheckPolicies } from 'src/casl/constants';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { getPagination } from 'src/utils/paginationService';
import { chatDataDto } from './chat-data/chatData.dto';
import { ChatDataReceptorService } from './chat-data/chatDataReceptor.service';
import { ContactMessagesService } from './contact-messages.service';
import { createMessageDto } from './dto/createMessage.dto';
import { ContactMessagesReasonsService } from './reasons/contactMessagesReasons.service';
import { createReason } from './reasons/reason.dto';

@Controller('contact-messages')
export class ContactMessagesController {
    constructor(private contactMessagesService: ContactMessagesService,
        private contactMessagesReasonsService: ContactMessagesReasonsService,
        private chatDataReceptorService: ChatDataReceptorService,

    ) { }

    @Post()
    async create(@Body() createMessageDto: createMessageDto) {
        return this.contactMessagesService.create(createMessageDto)
    }

    @Put('/:messageId')
    async setToAnswered(@Body() createMessageDto: createMessageDto,
        @Param() params) {
        const { messageId } = params;
        return this.contactMessagesService.update(messageId, createMessageDto)
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

    @Post('/chatPreform')
    async saveChatPreform(@Body() chatPreform: chatDataDto) {
        console.log(chatPreform)
        return this.chatDataReceptorService.saveChatPreform(chatPreform)
    }
    @Get('/chatPreform')
    async getChatPreformData(@Query() query) {
        const { page, size, wasAnswered, sentWhileOnline } = query;
        var condition = {};
        if (wasAnswered) {
            condition = {
                ...condition,
                wasAnswered: wasAnswered
            }
        }
        if (sentWhileOnline) {
            condition = {
                ...condition,
                sentWhileOnline: sentWhileOnline
            }
        }
        let { limit, offset } = getPagination(page, size);
        return this.chatDataReceptorService.getChatPreforms(condition, limit, offset, page)

    }


    @Put('/chatPreform/:id')
    async setChatPreformAsAnswered(@Param() params) {
        const { id } = params;
        return this.chatDataReceptorService.setPreformAsContacted(id)

    }

    @Get('/reasons')
    async getReasons() {
        return this.contactMessagesReasonsService.getReasons()
    }
}
