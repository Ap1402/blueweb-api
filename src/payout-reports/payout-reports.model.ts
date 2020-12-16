import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Client } from 'src/clients/client.model';

@Table
export class PayoutReports extends Model<PayoutReports> {
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
    transactionCode: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    bank: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    bankDestiny: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    accountOwnerDni: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    accountOwnerName: string;

    @ForeignKey(() => Client)
    @Column
    clientId: number;

    @BelongsTo(() => Client, 'clientId')
    client: Client;

    @DeletedAt
    deletedAt: Date;
}
