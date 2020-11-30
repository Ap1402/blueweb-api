import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { getPagination } from 'src/utils/paginationService';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() createUser: createUserDto) {
        return this.usersService.createUser(createUser);
    }

    @Get()
    async getUsers(@Param() params) {
        const { page, size } = params;
        const condition = null;

        let { limit, offset } = getPagination(page, size);

        return this.usersService.getAllUsers(condition, limit, offset, page);
    }


}
