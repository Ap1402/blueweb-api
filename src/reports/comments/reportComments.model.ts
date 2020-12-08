import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { Report } from '../report.model';

@Table
export class ReportComments extends Model<ReportComments> {
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
  comment: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  })
  user: User;


  @ForeignKey(() => Report)
  @Column
  reportId: number;

  @BelongsTo(() => Report, {
    foreignKey: 'reportId',
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  })
  report: Report;

  @DeletedAt
  deletedAt: Date;

}