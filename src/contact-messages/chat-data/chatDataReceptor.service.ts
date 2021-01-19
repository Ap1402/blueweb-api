import { Inject, Injectable, Logger } from '@nestjs/common';
import { getPagination, getPagingData } from 'src/utils/paginationService';
import { chatDataDto } from './chatData.dto';
import { ChatData } from './chatDataReceptor.model';

@Injectable()
export class ChatDataReceptorService {
    private readonly logger = new Logger(ChatDataReceptorService.name);
    constructor(
        @Inject('CHAT_DATA_REPOSITORY') private chatDataRepository: typeof ChatData,
    ) { }

    async saveChatPreform(preformData: chatDataDto) {
        this.logger.debug("Saving chatpreform data");
        return await this.chatDataRepository.create(preformData);
    };

    async getChatPreforms(condition, limit: number, offset: number, page: number) {
        this.logger.debug("Getting data preform");
        var where = {}
        if (condition.sentWhileOnline) {
            where = {
                ...where,
                sentWhileOnline: condition.sentWhileOnline
            }
        }
        if (condition.wasAnswered) {
            where = {
                ...where,
                wasAnswered: condition.wasAnswered
            }
        }
        const preFormsData = await this.chatDataRepository.findAndCountAll({
            where,
            limit,
            offset
        });

        const response = getPagingData(preFormsData, page, limit);
        return response;
    };


    /*   async getReasons(): Promise<ContactMessagesReasons[]> {
          this.logger.debug("Getting reasons");
          return await this.contactMessagesReasons.findAll();
      };
   */
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