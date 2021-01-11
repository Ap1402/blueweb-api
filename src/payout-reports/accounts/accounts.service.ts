import { Inject, Injectable, Logger } from '@nestjs/common';
import { getPagingData } from 'src/utils/paginationService';
import { accounts } from './accounts.dto';
import { Accounts } from './accounts.model';

@Injectable()
export class AccountsService {
    private readonly logger = new Logger(AccountsService.name);

    constructor(
        @Inject('PAYOUT_REPORTS_ACCOUNTS_REPOSITORY') private accountsRepository: typeof Accounts) { }

    async create(accountDto: accounts) {
        const result = await this.accountsRepository.create(accountDto)
        return result
    }

    async getAccounts(limit: number, offset: number, page: number) {
        this.logger.debug('Getting all accounts')
        const accounts = await this.accountsRepository.findAndCountAll({
            limit,
            offset
        });
        const response = getPagingData(accounts, page, limit);
        return response
    }



}
