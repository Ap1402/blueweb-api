import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ContactMessagesReasons } from './reasons/contactMessagesReasons.model';

@Table
export class ContactMessage extends Model<ContactMessage> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    message: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    wasAnswered: boolean;

    @ForeignKey(() => ContactMessagesReasons)
    @Column
    reasonId: number;

    @BelongsTo(() => ContactMessagesReasons, {
        foreignKey: 'reasonId',
        onDelete: 'RESTRICT'
    })
    reason: ContactMessagesReasons;

    @DeletedAt
    deletedAt: Date;

}
