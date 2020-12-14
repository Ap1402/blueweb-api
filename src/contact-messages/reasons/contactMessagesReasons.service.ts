import { Inject, Injectable, Logger } from '@nestjs/common';
import { getPagination, getPagingData } from 'src/utils/paginationService';
import { ContactMessagesReasons } from './contactMessagesReasons.model';
import { createReason } from './reason.dto';

@Injectable()
export class ContactMessagesReasonsService {
    private readonly logger = new Logger(ContactMessagesReasonsService.name);
    constructor(
        @Inject('CONTACT_MESSAGES_REASONS_REPOSITORY') private contactMessagesReasons: typeof ContactMessagesReasons,
    ) { }

    async createReason(createReason: createReason): Promise<ContactMessagesReasons> {
        this.logger.debug("Creating new reason");
        return await this.contactMessagesReasons.create(createReason);
    };

    async getReasons(): Promise<ContactMessagesReasons[]> {
        this.logger.debug("Getting reasons");
        return await this.contactMessagesReasons.findAll();
    };

    /*     async getAllCategories(condition, limit: number, offset: number, page: number, paranoid: boolean) {
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
     */

}