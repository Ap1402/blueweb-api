import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Client } from 'src/clients/client.model';
import { ClientsService } from 'src/clients/clients.service';
import { MailerService } from 'src/mailer/mailer.service';
import { Role } from 'src/roles/roles.model';
import { getPagingData } from 'src/utils/paginationService';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
const nodemailer = require("nodemailer");

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
        private clientsService: ClientsService,
        private mailerService: MailerService,
        @Inject('ROLES_REPOSITORY') private rolesRepository: typeof Role,
    ) { }

    async createUser(createUserDto: createUserDto) {
        const client: Client = await this.clientsService.getClientByDni(createUserDto.dni, createUserDto.identification)
        this.logger.debug('Searching for any user created for this client before')
        const userClient = await client.$get('user');
        if (userClient) {
            throw new HttpException('Este cliente ya tiene un usuario creado', HttpStatus.CONFLICT);
        }
        this.logger.debug('Searching for an user already registered with this username')
        const user = await this.usersRepository.findOne({
            where: {
                username: createUserDto.username
            }
        })
        if (user) {
            throw new HttpException('Este nombre de usuario ya está en uso', HttpStatus.BAD_REQUEST);
        }
        this.logger.log('Creating new user')
        const newUserData = {
            username: createUserDto.username,
            password: createUserDto.password,
        };

        const result: User = await client.$create('user', newUserData);
        this.logger.log('Setting client role')
        await result.$set('role', 1);
        return result;
    }

    async updateClientUser(userDto: updateUserDto, userId: number) {
        const user = await this.usersRepository.findByPk(userId);

        if (!user) {
            throw new HttpException('No se encontó un usuario con esta id', HttpStatus.NOT_FOUND);
        };

        this.logger.log('Updating user');

        user.username = userDto.username;
        user.roleId = userDto.roleId;
        user.isActive = parseInt(userDto.isActive) ? true : false;

        user.save();
        return user;
    }

    async getAllUsers(condition, limit: number, offset: number, page: number) {
        const users = await this.usersRepository.findAndCountAll({
            where: condition,
            limit,
            offset,
            include: [{
                model: Client,
                as: 'client',
                attributes: ['names', 'lastNames', 'dni', 'identification', 'email']
            }],
            attributes: { exclude: ['password'] }
        });
        const response = getPagingData(users, page, limit);
        return response;
    }

    async getUserById(id: number) {
        const user = await this.usersRepository.findByPk(id);
        if (!user) {
            throw new HttpException('Este usuario no existe', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async createUserOther(createUserDto: createUserDto) {
        this.logger.debug('Searching for an user already registered with this username')
        const user = await this.usersRepository.findOne({
            where: {
                username: createUserDto.username
            }
        })
        if (user) {
            throw new HttpException('Este nombre de usuario ya está en uso', HttpStatus.BAD_REQUEST);
        }
        this.logger.log('Creating new user')
        const newUserData = {
            username: createUserDto.username,
            password: createUserDto.password,
            roleId: createUserDto.roleId | 1
        };
        const result: User = await this.usersRepository.create(newUserData);
        return result;
    }

    async deactivate(id: number): Promise<User> {
        const user = await this.usersRepository.findByPk(id);
        user.isActive = false;
        return await user.save();
    }


}
