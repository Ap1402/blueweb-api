import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Report } from '../report.model';

@Table
export class ReportStatus extends Model<ReportStatus> {
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
  @HasMany(() => Report)
  reports: Report[];
}