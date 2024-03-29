import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action, CheckPolicies } from 'src/casl/constants';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { JoiValidationPipe } from 'src/utils/JoiValidationPipe';
import { getPagination } from 'src/utils/paginationService';
import { ClientsService } from './clients.service';
import { createClientDto } from './dto/create-client.dto';
import { updateClientSelfDto } from './dto/update-client-self.dto';
import { clientSchema } from './validator/clients.validator';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) { }

  @Post()
  @UsePipes(new JoiValidationPipe(clientSchema, false))
  async create(@Body() createClient: createClientDto) {
    return this.clientsService.createClient(createClient);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadAny, 'client'))
  @Get()
  async getAll(@Query() query) {
    const { page, size, name, dni } = query;

    var condition = {};

    if (name) {
      condition = {
        ...condition,
        names: name
      }
    }

    if (dni) {
      condition = {
        ...condition,
        dni: dni
      }
    }

    let { limit, offset } = getPagination(page, size);

    return this.clientsService.getAllClients(condition, limit, offset, page);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadOwn, 'client'))
  @Get('/me')
  async getSelfClient(
    @Request() req) {
    const { clientId } = req.user;
    return this.clientsService.getClientById(clientId);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.UpdateOwn, 'client'))
  @Put('/me')
  async updateSelfClient(
    @Request() req,
    @Body(new JoiValidationPipe(clientSchema, { update: true, updateSelf: true })) updateClient: updateClientSelfDto) {

    const { clientId } = req.user;
    return this.clientsService.updateSelfClient(
      {
        phone: updateClient.phone,
        email: updateClient.email,
        password: updateClient.password
      }, clientId
    );
  };

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadAny, 'client'))
  @Get(':clientId')
  async getClientById(
    @Param() params) {
    const { clientId } = params;
    return this.clientsService.getClientById(clientId);
  }


  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.UpdateAny, 'client'))
  @Put(':clientId')
  async updateClient(
    @Param() params,
    @Body(new JoiValidationPipe(clientSchema, { update: true, updateSelf: false })) updateClient: createClientDto) {
    const { clientId } = params;
    return this.clientsService.updateClient(
      {
        names: updateClient.names,
        lastNames: updateClient.lastNames,
        address: updateClient.address,
        city: updateClient.city,
        dni: updateClient.dni,
        state: updateClient.state,
        phone: updateClient.phone,
        isEnterprise: updateClient.isEnterprise,
        socialReason: updateClient.isEnterprise ? updateClient.socialReason : "",
        commercialReason: updateClient.isEnterprise ? updateClient.commercialReason : "",
        municipality: updateClient.municipality,
        identification: updateClient.identification,
        email: updateClient.email
      },
      clientId
    );
  };
}
