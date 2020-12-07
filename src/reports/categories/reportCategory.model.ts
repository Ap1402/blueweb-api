import { BelongsTo, Column, DataType, DeletedAt, HasMany, Model, Table } from 'sequelize-typescript';
import { Report } from '../report.model';

@Table
export class ReportCategory extends Model<ReportCategory> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  defaultPriorityLevel: string;

  @HasMany(() => Report)
  reports: Report[];

  @DeletedAt
  deletedAt: Date;
}