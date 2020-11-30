import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table
export class Role extends Model<Role> {
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

  @Column({ defaultValue: true })
  isActive: boolean;
  
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column
  userId: number;

}
