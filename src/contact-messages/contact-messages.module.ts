import { Module } from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { ContactMessagesController } from './contact-messages.controller';
import { contactMessages } from './contact-messages.providers';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  providers: [ContactMessagesService, ...contactMessages],
  imports:[CaslModule],
  controllers: [ContactMessagesController]
})
export class ContactMessagesModule { }
