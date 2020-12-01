import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getPagingData } from 'src/utils/paginationService';
import { ContactMessage } from './contact-messages.model';
import { createMessageDto } from './dto/createMessage.dto';

@Injectable()
export class ContactMessagesService {

    constructor(
        @Inject('CONTACT_MESSAGES_REPOSITORY') private contactMessagesRepository: typeof ContactMessage,
    ) { }

    async create(createMessageDto: createMessageDto): Promise<ContactMessage> {
        return await this.contactMessagesRepository.create(createMessageDto)
    }

    async getAll(condition, limit: number, offset: number, page: number) {
        const messages = await this.contactMessagesRepository.findAndCountAll({
            where: condition,
            limit,
            offset
        });
        const response = getPagingData(messages, page, limit);
        return response;
    }

    async getById(id: number): Promise<ContactMessage> {
        const message: ContactMessage = await this.contactMessagesRepository.findByPk(id);
        if (!message) {
            throw new HttpException('Este cliente no existe', HttpStatus.NOT_FOUND)
        }

        return message;
    }

    async setAnswered(id: number): Promise<ContactMessage> {
        const message = await this.getById(id);
        message.wasAnswered = true;
        return await message.save()
    }

    async countMessages(wasAnswered: boolean): Promise<number> {
        return await this.contactMessagesRepository.count({ where: { wasAnswered } });
    }

    async update(id: number, messageDto: createMessageDto): Promise<ContactMessage> {
        const message = await this.getById(id);
        message.wasAnswered = messageDto.wasAnswered;
        return await message.save()
    }

}
