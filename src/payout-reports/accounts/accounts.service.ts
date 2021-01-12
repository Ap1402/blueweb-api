import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
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

    async getById(id: number) {
        const account = await this.accountsRepository.findByPk(id);
        if (!account) {
            throw new HttpException('No se encontró esta cuenta', HttpStatus.NOT_FOUND)
        }
        return account;
    }

    async updateAccount(accountDto: accounts, accountId: number):Promise<Accounts> {
        this.logger.debug('Updating Account')
        const account = await this.getById(accountId)
        for (const key of Object.keys(accountDto)) {
            account[key] = accountDto[key];
        }
        return await account.save();
    }




}
