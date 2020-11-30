import { HttpException, HttpStatus, Inject, Injectable, Logger, Post } from '@nestjs/common';
import { getPagingData } from 'src/utils/paginationService';
import { Client } from './client.model';
import { createClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @Inject('CLIENTS_REPOSITORY') private clientsRepository: typeof Client,
  ) {}

  async createClient(clientDto: createClientDto) {
    this.logger.debug('Request for creating new client, searching other clients with designed dni');
    const client = await this.clientsRepository.findOne({
      where: { dni: clientDto.dni, identification: clientDto.identification },
    });
    if(client){
        throw new HttpException('Hay un cliente ya registrado con esta cédula o rif',HttpStatus.CONFLICT);
    };
    this.logger.debug('No client found with designed dni, calling sequelize create function for new client');
    const newClient = await this.clientsRepository.create(clientDto);
    return newClient;
  }


  async updateClient(clientDto:createClientDto, id:number){
    const client = await this.clientsRepository.findByPk(id)
    console.log(clientDto)
    if(!client){
        throw new HttpException('Parece que el cliente que intentas actualizar no existe',HttpStatus.NOT_FOUND);
    }
    for (const key of Object.keys(clientDto)) {
        client[key] = clientDto[key];
    }
    await client.save();
    return client;
  }


  async getAllClients(condition,limit:number,offset:number,page:number){
    const clients = await this.clientsRepository.findAndCountAll({
      where:condition,
      limit,
      offset
    });
    const response= getPagingData(clients,page,limit);
    return response;
  }

  async getClientById(id:number){
    const client= await this.clientsRepository.findByPk(id);
    if(!client){
      throw new HttpException('Parece que el cliente que buscas no existe',HttpStatus.NOT_FOUND);
    }
    return client
  }

  async getClientByDni(dni:number, identification:string){
    const client = await this.clientsRepository.findOne({
      where: { dni: dni, identification: identification }
    });
    if(!client){
      this.logger.debug('No client found with this dni');

      throw new HttpException('Parece que el cliente que buscas no existe',HttpStatus.NOT_FOUND);
    }
    this.logger.debug('Success, returning client');

    return client
  }

}
