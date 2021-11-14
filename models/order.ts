import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../db/connection";
import Employee from "./employee";
import OrderDetail from "./order-detail";
import Table from './table';
import OrderState from './order-state';

interface OrderAttributes {
    idOrden: number,
    idEmpleado: number,
    idComercial: number,
    idMesa: number,
    idOrdenEstado: number,
    nombreCliente: string,
    fechaOrden: Date,
    importe: number;
    total: number;
    
    deletedAt?: Date,
    updatedAt?: Date,
    createdAt?: Date,
}

interface OrderInput extends Optional<OrderAttributes, 'idOrden' | 'idOrdenEstado'  | 'total' > { }

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
    public idOrden!: number;
    public idEmpleado!: number;
    public idComercial!: number;
    public idMesa!: number;
    public idOrdenEstado!: number;
    public nombreCliente!: string;
    public fechaOrden!: Date;
    public done!: boolean;
    public pagado!: boolean;
    public importe!: number;
    public total!: number;
    
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
    idOrdenEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaOrden: {
        type: DataTypes.DATE,
        allowNull: false
    },
    importe: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    total: {
        type: DataTypes.DOUBLE,
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

Order.belongsTo(OrderState, {
    foreignKey: 'idOrdenEstado'
});

export default Order;