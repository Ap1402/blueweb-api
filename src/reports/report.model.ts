import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasOne, Association, DeletedAt } from 'sequelize-typescript';
import { Client } from 'src/clients/client.model';
import { ReportCategory } from './categories/reportCategory.model';
import { ReportStatus } from './statuses/reportStatus.model';

@Table
export class Report extends Model<Report> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.STRING,
  })
  priorityLevel: string;

  @Column({
    type: DataType.STRING,
  })
  supportMessageForClient: string;

  @Column({
    type: DataType.STRING,
  })
  supportMessageInner: string;

  @ForeignKey(() => Client)
  @Column
  clientId: number;

  @BelongsTo(() => Client, {
    foreignKey: 'clientId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  client: Client;

  @ForeignKey(() => ReportCategory)
  @Column
  categoryId: number;

  @BelongsTo(() => ReportCategory, {
    foreignKey: 'categoryId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  category: ReportCategory;


  @ForeignKey(() => ReportStatus)
  @Column
  statusId: number;

  @BelongsTo(() => ReportStatus, {
    foreignKey: 'statusId',
    onDelete: 'RESTRICT'
  })
  status: ReportStatus;

  @DeletedAt
  deletedAt: Date;
}
