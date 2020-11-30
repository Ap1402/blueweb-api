import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Token extends Model<Token> {
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
    tokenKey: string;

}
