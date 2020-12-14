import { Module } from '@nestjs/common';
import { FactibilityRequestsService } from './factibility-requests.service';
import { FactibilityRequestsController } from './factibility-requests.controller';
import { factibilityRequest } from './factibility-requests.providers';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  providers: [FactibilityRequestsService, ...factibilityRequest],
  imports:[MailerModule],
  controllers: [FactibilityRequestsController]
})
export class FactibilityRequestsModule {}
