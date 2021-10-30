import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../db/connection";
import Employee from "./employee";
import OrderDetail from "./order-detail";
import Table from './table';

interface OrderAttributes {
    idOrden: number,
    idEmpleado: number,
    idComercial: number,
    idMesa: number,
    nombreCliente: string,
    fechaOrden: Date,
    done: boolean,
    pagado: boolean,

    deletedAt?: Date,
    updatedAt?: Date,
    createdAt?: Date,
}

interface OrderInput extends Optional<OrderAttributes, 'idOrden' | 'done' | 'pagado' | 'idMesa'> { }

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
    public idOrden!: number;
    public idEmpleado!: number;
    public idComercial!: number;
    public idMesa!: number;
    public nombreCliente!: string;
    public fechaOrden!: Date;
    public done!: boolean;
    public pagado!: boolean;

    public readonly deletedAt!: Date;
    public readonly updatedAt!: Date;
    public readonly createdAt!: Date;
}

Order.init({
    idOrden: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idEmpleado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idComercial: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMesa: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaOrden: {
        type: DataTypes.DATE,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    pagado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    modelName: 'order',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});

Order.hasMany(OrderDetail, {
    foreignKey: 'idOrden'
});

Order.belongsTo(Employee, {
    foreignKey: 'idEmpleado'
});

Order.belongsTo(Table, {
    foreignKey: 'idMesa'
});

export default Order;