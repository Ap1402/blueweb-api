import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.providers';
import { ClientsModule } from 'src/clients/clients.module';
import { RolesModule } from 'src/roles/roles.module';
import { CaslModule } from 'src/casl/casl.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProvider],
  imports: [ClientsModule, RolesModule, CaslModule, MailerModule],
  exports: [...usersProvider]
})
export class UsersModule { }
