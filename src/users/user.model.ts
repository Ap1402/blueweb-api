import { BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, DeletedAt, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Client } from 'src/clients/client.model';
import { Role } from 'src/roles/roles.model';
import * as bcrypt from 'bcrypt';
import { PayoutReports } from 'src/payout-reports/payout-reports.model';

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
    unique: true
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

  @ForeignKey(() => Client)
  @Column
  clientId: number;

  @BelongsTo(() => Client, 'clientId')
  client: Client;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role, 'roleId')
  role: Role;

  @HasMany(() => PayoutReports)
  payoutReports: PayoutReports[]

  @BeforeUpdate
  @BeforeCreate
  static hashPassword(user: User) {
    user.password =
      user.changed('password') && user.password != ""
        ? bcrypt.hashSync(user.password, 10)
        : user.password != "" ? user.password : '';
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  @DeletedAt
  deletedAt: Date;

  toJSON() {

    return { ...super.toJSON(), password: null };
  }
}
