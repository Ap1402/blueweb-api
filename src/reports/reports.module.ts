import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { reportsProvider } from './reports.providers';
import { ClientsModule } from 'src/clients/clients.module';
import { ReportStatusService } from './statuses/reportStatusService';
import { ReportCategoryService } from './categories/reportCategory.service';
import { CaslModule } from 'src/casl/casl.module';
import { ReportCommentsService } from './comments/reportCommentsService';

@Module({
  providers: [ReportsService, ...reportsProvider, ReportStatusService, ReportCategoryService, ReportCommentsService],
  controllers: [ReportsController],
  imports: [ClientsModule, CaslModule]
})
export class ReportsModule { }
