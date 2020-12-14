import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { getPagingData } from 'src/utils/paginationService';
import { createFactibilityDto } from './dto/create-factibility.dto';
import { FactibilityRequest } from './factibility-request.model';

@Injectable()
export class FactibilityRequestsService {
    private readonly logger = new Logger(FactibilityRequestsService.name);

    constructor(
        @Inject('FACTIBILITY_REQUESTS_REPOSITORY') private factibilityRequestsRepository: typeof FactibilityRequest,
        private mailerService: MailerService,

    ) { }

    async create(createDto: createFactibilityDto): Promise<FactibilityRequest> {
        this.logger.debug('Creating new factibility request')
        const result = await this.factibilityRequestsRepository.create(createDto);
        if (result) {
            await this.mailerService.sendFactibilityRegisteredEmail(result.requesterEmail);
        }
        return result
    }

    async getAllRequests(condition, limit: number, offset: number, page: number) {
        const requests = await this.factibilityRequestsRepository.findAndCountAll({
            where: condition,
            limit,
            offset
        });
        const response = getPagingData(requests, page, limit);
        return response;
    }

    async getRequestById(id: number): Promise<FactibilityRequest> {
        const request = await this.factibilityRequestsRepository.findByPk(id);
        if (!request) {
            throw new HttpException('No se logró encontrar la solicitud que busca', HttpStatus.NOT_FOUND)
        }
        return request
    }

    async update(id: number, updateDto: createFactibilityDto) {
        const request = await this.getRequestById(id);
        request.isFactible = updateDto.isFactible;
        request.supportMessage = updateDto.supportMessage;
        request.wasEvaluated = updateDto.wasEvaluated;
        await request.save();
        return request;
    }


    async count(pending): Promise<number> {
        return await this.factibilityRequestsRepository.count({ where: pending });
    }

}
