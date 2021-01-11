import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table
export class Accounts extends Model<Accounts> {
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
    bankName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    number: string;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    ownerName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    ownerRif: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;


    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    international: boolean;

    @DeletedAt
    deletedAt: Date;
}
