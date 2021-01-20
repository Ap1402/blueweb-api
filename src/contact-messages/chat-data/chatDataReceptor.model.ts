import { Column, DataType, DeletedAt, HasMany, Model, Table } from 'sequelize-typescript';
import { ContactMessage } from '../contact-messages.model';

@Table
export class ChatData extends Model<ChatData> {
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
    reason: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phone: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    message: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentWhileOnline: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    })
    wasAnswered: boolean;

    @DeletedAt
    deletedAt: Date;
}