import { Sequelize } from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';
import { Client } from 'src/clients/client.model';
import { ContactMessage } from 'src/contact-messages/contact-messages.model';
import { FactibilityRequest } from 'src/factibility-requests/factibility-request.model';
import { ReportCategory } from 'src/reports/categories/reportCategory.model';
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
        database:"blue_web",
        username:"blue-web-admin",
        password:"2804"
      });
      sequelize.addModels([Client, User, ReportCategory,ReportStatus,Report, Token,ContactMessage, Role, FactibilityRequest]);
/*       await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
 */      await sequelize.sync(/* {force:true} */)
      await Role.create({name:'client'})
      return sequelize;
    },
  },
];