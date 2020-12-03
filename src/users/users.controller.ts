import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { getPagination } from 'src/utils/paginationService';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { Action, CheckPolicies } from 'src/casl/constants';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { JoiValidationPipe } from 'src/utils/JoiValidationPipe';
import { userSchema } from './validators/users.validator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body(new JoiValidationPipe(userSchema, { create: true })) createUser: createUserDto) {
        return this.usersService.createUser(createUser);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadAny, 'users'))
    @Get()
    async getUsers(@Param() params) {
        const { page, size } = params;
        const condition = null;

        let { limit, offset } = getPagination(page, size);

        return this.usersService.getAllUsers(condition, limit, offset, page);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getSelfUser(@Request() req) {
        const { userId } = req.user
        return this.usersService.getUserById(userId);
    }

    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'otherRoles'))
    @Post('/other-roles')
    async createOtherRoles(@Body(new JoiValidationPipe(userSchema, { create: true })) createUser: createUserDto) {
        return this.usersService.createUserOther(createUser);
    }


}
