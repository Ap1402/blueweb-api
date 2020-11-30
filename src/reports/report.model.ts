import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
