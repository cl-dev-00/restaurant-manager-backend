import { DataTypes, Model, Optional } from "sequelize";
import SequelizeConnection from "../db/connection";
import Employee from "./employee";
import Order from "./order";

interface AccountAttributes {
    idCuenta: number,
    nombreCliente: string,
    fechaCuenta: Date,
    idEmpleado: number,

    deletedAt?: Date,
    updatedAt?: Date,
    createdAt?: Date,
}

interface AccountInput extends Optional<AccountAttributes, 'idCuenta'> {  }

class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
    public idCuenta!: number;
    public nombreCliente!: string;
    public fechaCuenta!: Date;
    public idEmpleado!: number;

    public readonly deletedAt!: Date;
    public readonly updatedAt!: Date;
    public readonly createdAt!: Date;
}

Account.init({
    idCuenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaCuenta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idEmpleado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    modelName: 'account',
    timestamps: false,
    sequelize: SequelizeConnection,
    paranoid: true
});

Account.hasMany(Order, {
    foreignKey: 'idCuenta'
});

Account.belongsTo(Employee, {
    foreignKey: 'idEmpleado'
});

export default Account;