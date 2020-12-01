import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class FactibilityRequest extends Model<FactibilityRequest> {
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
    coordenades: string;

    @Column({
        type: DataType.BOOLEAN
    })
    isFactible: boolean;


    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: ""
    })
    supportMessage: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    requesterPhone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    requesterEmail: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue:false
    })
    wasEvaluated: boolean;

}
