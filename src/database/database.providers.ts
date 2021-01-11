import { Sequelize } from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';
import { Client } from 'src/clients/client.model';
import { ContactMessage } from 'src/contact-messages/contact-messages.model';
import { ContactMessagesReasons } from 'src/contact-messages/reasons/contactMessagesReasons.model';
import { FactibilityRequest } from 'src/factibility-requests/factibility-request.model';
import { Accounts } from 'src/payout-reports/accounts/accounts.model';
import { PayoutReports } from 'src/payout-reports/payout-reports.model';
import { ReportCategory } from 'src/reports/categories/reportCategory.model';
import { ReportComments } from 'src/reports/comments/reportComments.model';
import { Report } from 'src/reports/report.model';
import { ReportStatus } from 'src/reports/statuses/reportStatus.model';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        database: "blue_web",
        username: "blue-web-admin",
        password: "2804"
      });
      sequelize.addModels([Client, ReportComments, User, ReportCategory, ReportStatus, Report, Token, ContactMessage,
        ContactMessagesReasons, Role, FactibilityRequest, PayoutReports, Accounts]);
      /*    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
         await sequelize.sync({ force: true })
         await ReportStatus.create({ name: 'Pendiente' })
         await ReportCategory.create({ name: 'Falla total del servicio', defaultPriorityLevel: 10 })
         await ReportCategory.create({ name: 'Pago no registrado', defaultPriorityLevel: 10 })
         await ReportCategory.create({ name: 'Lentitud del servicio', defaultPriorityLevel: 10 }) */

      /*       await Role.create({ name: 'client' })
       */       /* await sequelize.sync({ alter: true}) */
      return sequelize;
    },
  },
];