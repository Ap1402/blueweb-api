import { Column, DataType, DeletedAt, Model, Table } from 'sequelize-typescript';

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
    reason: string;

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


    @DeletedAt
    deletedAt: Date;

}
