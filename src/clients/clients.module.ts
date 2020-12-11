import { Module } from '@nestjs/common';
import { clientsProvider } from './clients.providers';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { CaslModule } from 'src/casl/casl.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  providers: [ClientsService, ...clientsProvider],
  controllers: [ClientsController],
  imports: [CaslModule, MailerModule],
  exports: [ClientsService]
})
export class ClientsModule { }
