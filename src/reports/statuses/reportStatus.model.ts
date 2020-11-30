import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

}