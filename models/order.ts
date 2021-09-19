import { DataTypes, Model, Optional } from 'sequelize';

import SequelizeConnection from '../db/connection';
import MenuItem from './menu-items';

interface OrderAttributes {

    idPedido: number,
    idCuenta: number,
    id_item_name: number,
    cantidad: number,
    importe: number,

    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,

}

interface OrderInput extends Optional<OrderAttributes, 'idPedido'> { }

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {

    public idPedido!: number;
    public idCuenta!: number;
    public id_item_name!: number;
    public cantidad!: number;
    public importe!: number;

    public readonly deletedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Order.init({
    idPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCuenta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_item_name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    importe: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    modelName: 'order',
    timestamps: false,
    sequelize: SequelizeConnection,
    paranoid: true
    
});

Order.belongsTo(MenuItem, {
    foreignKey: 'id_item_name'
});

export default Order;