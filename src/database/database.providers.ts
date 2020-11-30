import { Sequelize } from 'sequelize-typescript';
import { Client } from 'src/clients/client.model';
import { ReportStatus } from 'src/reports/categories/reportCategory.model';
import { Report } from 'src/reports/report.model';
import { ReportCategory } from 'src/reports/statuses/reportStatus.model';
import { User } from 'src/users/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'abc',
        password: 'abc',
        database: 'abc'
      });
      sequelize.addModels([Client, User, Report, ReportCategory, ReportStatus]);
      await sequelize.sync();
      return sequelize;
    },
  },
];