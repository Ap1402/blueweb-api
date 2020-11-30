import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import {reportsProvider} from './reports.providers';
import { ClientsModule } from 'src/clients/clients.module';
import { ReportStatusService } from './statuses/reportStatusService';
import { ReportCategoryService } from './categories/reportCategory.service';

@Module({
  providers: [ReportsService, ...reportsProvider, ReportStatusService, ReportCategoryService],
  controllers: [ReportsController],
  imports:[ClientsModule]
})
export class ReportsModule {}
