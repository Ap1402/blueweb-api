import { Module } from '@nestjs/common';
import { clientsProvider } from './clients.providers';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  providers: [ClientsService, ...clientsProvider],
  controllers: [ClientsController]
})
export class ClientsModule {}
