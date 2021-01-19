import { Module } from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { ContactMessagesController } from './contact-messages.controller';
import { contactMessages } from './contact-messages.providers';
import { CaslModule } from 'src/casl/casl.module';
import { ContactMessagesReasonsService } from './reasons/contactMessagesReasons.service';
import { ChatDataReceptorService } from './chat-data/chatDataReceptor.service';

@Module({
  providers: [ContactMessagesService, ...contactMessages, ContactMessagesReasonsService, ChatDataReceptorService],
  imports: [CaslModule],
  controllers: [ContactMessagesController]
})
export class ContactMessagesModule { }
