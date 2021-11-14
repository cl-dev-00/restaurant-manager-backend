import { Optional, Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../db/connection';
import CashRegister from './CashRegister';

interface BoxActionsAttributes {

    idBoxAction: number;
    idCashRegister: number;
    monto: number;
    isInput: boolean;
    descripcion: string;
    fecha: Date;

    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface BoxActionInput extends Optional<BoxActionsAttributes, 'idBoxAction' > { }

class BoxAction extends Model<BoxActionsAttributes, BoxActionInput> {
    
    public idBoxAction!: number;
    public idCashRegister!: number;
    public monto!: number;
    public isInput!: boolean;
    public descripcion!: string;
    public fecha!: Date;
    
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

BoxAction.init({
    idBoxAction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCashRegister: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    isInput: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    modelName: 'box_action',
    sequelize: sequelizeConnection,
    paranoid: true,
    timestamps: true
});

BoxAction.belongsTo(CashRegister, {
    foreignKey: 'idCashRegister'
});

export default BoxAction;