import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProvider]
})
export class UsersModule {}
