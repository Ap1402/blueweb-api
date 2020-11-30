import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Client extends Model<Client> {
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
  names: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastNames: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  identification: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dni: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isEnterprise: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  socialReason: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  commercialReason: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  municipality: string;

  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
