import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/constants';
import { Client } from 'src/clients/client.model';
import { ClientsService } from 'src/clients/clients.service';
import { User } from 'src/users/user.model';
import { getPagingData } from 'src/utils/paginationService';
import { ReportCategory } from './categories/reportCategory.model';
import { ReportComments } from './comments/reportComments.model';
import { ReportCommentsService } from './comments/reportCommentsService';
import { Report } from './report.model';
import { ReportStatus } from './statuses/reportStatus.model';
import { Op } from 'sequelize'

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);
  constructor(
    @Inject('REPORTS_REPOSITORY') private reportsRepository: typeof Report,
    @Inject('REPORTS_STATUS_REPOSITORY') private reportStatusRepository: typeof ReportStatus,
    @Inject('REPORTS_CATEGORY_REPOSITORY') private reportCategoryRepository: typeof ReportCategory,
    private clientsService: ClientsService,
    private reportsCommentsService: ReportCommentsService,
    private caslAbilityFactory: CaslAbilityFactory) { }

  async createReport(averieDto, clientId: number) {
    try {
      this.logger.debug("Creating new report");
      const client = await this.clientsService.getClientById(clientId);
      if (!client) {
        throw new HttpException("Hay un problema con la cédula ingresada", HttpStatus.BAD_REQUEST);
      }

      const category: ReportCategory = await this.reportCategoryRepository.findByPk(averieDto.categoryId);
      if (!category) {
        throw new HttpException("La categoria seleccionada no existe", HttpStatus.NOT_FOUND);
      }

      const newReport: Report = await this.reportsRepository.create({
        message: averieDto.message,
        priorityLevel: category.defaultPriorityLevel,
      });
      await newReport.$set('client', client)
      await newReport.$set('category', category);
      await newReport.$set('status', 1);

      return newReport;
    } catch (err) {
      throw err;
    }
  };

  async getAll(condition, limit: number, offset: number, page: number) {
    this.logger.debug("Getting all reports");
    var where = {}

    if (condition.client) {
      where = {
        ...where,
        [Op.or]: [{
          '$client.names$': {
            [Op.like]: `%${condition.client}%`
          }
        }, {
          '$client.lastNames$': {
            [Op.like]: `%${condition.client}%`
          }
        }]
      }
    }

    if (condition.dni) {
      where = {
        ...where,
        '$client.dni$': {
          [Op.like]: `${condition.dni}%`
        }
      }
    }

    const requests = await this.reportsRepository.findAndCountAll({
      order: [
        [condition.orderBy, condition.order],
      ],
      where,
      limit,
      offset,
      include: [{
        model: ReportCategory, attributes: ['id', 'name']
      }, { model: ReportStatus, attributes: ['id', 'name'] }, { model: Client, attributes: ['id', 'names', 'dni', 'identification'] }
      ],
    });
    const response = getPagingData(requests, page, limit);
    return response;
  }

  async getByClient(limit: number, offset: number, page: number, clientId: number) {
    this.logger.debug("Getting all reports by client");
    const requests = await this.reportsRepository.findAndCountAll({
      where: { clientId },
      limit,
      offset,
      include: [{
        model: ReportCategory
      }, { model: ReportStatus }, { model: Client }]
    });
    const response = getPagingData(requests, page, limit);

    return response;
  }

  async getById(reportId: number): Promise<Report> {
    return await this.reportsRepository.findByPk(reportId);
  }

  async updateReport(reportId: number, reportDto, userId: number) {
    this.logger.debug("Searching report by Id");
    const report = await this.reportsRepository.findByPk(reportId);
    if (!report) {
      throw new HttpException('No se ha encontrado el reporte que desea actualizar', HttpStatus.NOT_FOUND)
    }
    this.logger.debug("Assigning values to found report");

    report.supportMessageForClient = reportDto.supportMessageForClient;
    report.priorityLevel = reportDto.priorityLevel;

    report.$set('status', reportDto.statusId)
    report.$set('category', reportDto.categoryId)

    if (report.changed()) {
      this.logger.debug("Assigning logged user to updatedBy");
      report.$set('updatedByUser', userId)
    }

    //Using trim for eliminating white spaces so it won't pass the conditional
    if (reportDto.supportMessageInner && reportDto.supportMessageInner.trim()) {
      this.logger.debug("Creating new comment in report");

      this.reportsCommentsService.createComment({
        reportId: reportId,
        comment: reportDto.supportMessageInner
      }, userId)
    }

    await report.save();

    return report;

  };

  async prueba(user) {
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Read, 'all')) {
      console.log('pasado')
    } else {
      console.log('fallido')
    }
  }

}
