import { HttpException, HttpStatus, Inject, Injectable, Logger, Post } from '@nestjs/common';
import { getPagingData } from 'src/utils/paginationService';
import { Client } from './client.model';
import { createClientDto } from './dto/create-client.dto';
import { updateClientSelfDto } from './dto/update-client-self.dto';
import { Op } from 'sequelize'
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @Inject('CLIENTS_REPOSITORY') private clientsRepository: typeof Client,
    private mailerService: MailerService,

  ) { }

  async createClient(clientDto: createClientDto) {
    this.logger.debug('Request for creating new client, searching other clients with designed dni');
    const client = await this.clientsRepository.findOne({
      where: { dni: clientDto.dni, identification: clientDto.identification },
    });
    if (client) {
      throw new HttpException('Hay un cliente ya registrado con esta cédula o rif', HttpStatus.CONFLICT);
    };
    this.logger.debug('No client found with designed dni, calling sequelize create function for new client');
    const newClient = await this.clientsRepository.create(clientDto);
    this.mailerService.sendRegisterEmail(newClient.email)
    return newClient;
  }


  async updateClient(clientDto: createClientDto, id: number) {
    this.logger.debug('Updating client');
    const client = await this.clientsRepository.findByPk(id)
    if (!client) {
      throw new HttpException('Parece que el cliente que intentas actualizar no existe', HttpStatus.NOT_FOUND);
    }
    for (const key of Object.keys(clientDto)) {
      client[key] = clientDto[key];
    }
    await client.save();
    return client;
  }

  async updateSelfClient(clientDto: updateClientSelfDto, id: number) {
    const client = await this.clientsRepository.findByPk(id)
    const user = await client.$get('user');
    if (!user.comparePassword(clientDto.password)) {
      throw new HttpException('La contraseña que ingresó no es correcta', HttpStatus.BAD_REQUEST);
    }
    if (!client) {
      throw new HttpException('Parece que el cliente que intentas actualizar no existe', HttpStatus.NOT_FOUND);
    }
    for (const key of Object.keys(clientDto)) {
      client[key] = clientDto[key];
    }
    await client.save();
    return client;
  }


  async getAllClients(condition, limit: number, offset: number, page: number) {
    var where = {}

    /*   if (condition.names) {
        where = {
          ...where,
          [Op.or]: [{
            names: {
              [Op.like]: `%${condition.names}%`
            }
          }, {
            lastNames: {
              [Op.like]: `%${condition.names}%`
            }
          }]
        }
      } */
    if (condition.dni) {
      where = {
        ...where,
        dni: {
          [Op.like]: `%${condition.dni}%`
        }
      }
    }

    const clients = await this.clientsRepository.findAndCountAll({
      where,
      limit,
      offset
    });
    const response = getPagingData(clients, page, limit);
    return response;
  }

  async getClientById(id: number) {
    const client = await this.clientsRepository.findByPk(id);
    if (!client) {
      throw new HttpException('Parece que el cliente que buscas no existe', HttpStatus.NOT_FOUND);
    }
    return client
  }

  async getClientByDni(dni: number, identification: string) {
    const client = await this.clientsRepository.findOne({
      where: { dni: dni, identification: identification }
    });
    if (!client) {
      this.logger.debug('No client found with this dni');

      throw new HttpException('La cédula ingresada no coincide con ninguna de nuestros clientes, asegúrese de usar la del títular', HttpStatus.NOT_FOUND);
    }
    this.logger.debug('Success, returning client');

    return client
  }

}
