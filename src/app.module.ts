import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ClientsModule, DatabaseModule, UsersModule, ReportsModule, ContactMessagesModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
