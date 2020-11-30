import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/JoiValidationPipe';
import { getPagination, getPagingData } from 'src/utils/paginationService';
import { ClientsService } from './clients.service';
import { createClientDto } from './dto/create-client.dto';
import { clientSchema } from './validator/clients.validator';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(clientSchema))
  async create(@Body() createClient: createClientDto) {
    return this.clientsService.createClient(createClient);
  }

  @Get()
  async getAll(@Param() params) {
    const { page, size } = params;
    const condition = null;

    let { limit, offset } = getPagination(page, size);

    return this.clientsService.getAllClients(condition, limit, offset, page);
  }
}
