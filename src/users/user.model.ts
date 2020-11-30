import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
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
    unique:true
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  get password(): string {
    return this.getDataValue("password");
  }
  set password(value: string) {
    this.setDataValue('password', value);
  };





  @Column({ defaultValue: true })
  isActive: boolean;
}
