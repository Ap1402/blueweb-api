import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  defaultPriorityLevel: string;

}