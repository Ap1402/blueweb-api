import { Column, DataType, DeletedAt, HasMany, Model, Table } from 'sequelize-typescript';
import { ContactMessage } from '../contact-messages.model';

@Table
export class ContactMessagesReasons extends Model<ContactMessagesReasons> {
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

  @HasMany(() => ContactMessage)
  contactMessages: ContactMessage[];

  @DeletedAt
  deletedAt: Date;
}