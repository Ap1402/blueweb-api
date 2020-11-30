import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import {reportsProvider} from './reports.providers';

@Module({
  providers: [ReportsService, ...reportsProvider],
  controllers: [ReportsController]
})
export class ReportsModule {}
