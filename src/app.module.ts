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
import { CaslModule } from './casl/casl.module';
import { FactibilityRequestsModule } from './factibility-requests/factibility-requests.module';
import { MailerModule } from './mailer/mailer.module';
import { PayoutReportsModule } from './payout-reports/payout-reports.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [ClientsModule, DatabaseModule, UsersModule, ReportsModule, ContactMessagesModule, AuthModule, RolesModule, CaslModule, FactibilityRequestsModule, MailerModule, PayoutReportsModule, ConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
