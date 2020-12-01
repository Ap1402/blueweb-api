import { Module } from '@nestjs/common';
import { FactibilityRequestsService } from './factibility-requests.service';
import { FactibilityRequestsController } from './factibility-requests.controller';
import { factibilityRequest } from './factibility-requests.providers';

@Module({
  providers: [FactibilityRequestsService, ...factibilityRequest],
  controllers: [FactibilityRequestsController]
})
export class FactibilityRequestsModule {}
