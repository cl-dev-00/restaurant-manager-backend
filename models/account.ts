import { DataTypes, Model, Optional } from "sequelize";
import SequelizeConnection from "../db/connection";
import Employee from "./employee";
import Order from "./order";

interface AccountAttributes {
    idCuenta: number,
    nombreCliente: string,
    fechaCuenta: Date,
    done: Boolean,
    idEmpleado: number,
    comentarios: string,
    
    deletedAt?: Date,
    updatedAt?: Date,
    createdAt?: Date,
}

interface AccountInput extends Optional<AccountAttributes, 'idCuenta' | 'done'> {  }

class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
    public idCuenta!: number;
    public nombreCliente!: string;
    public fechaCuenta!: Date;
    public done!: boolean;
    public idEmpleado!: number;
    public comentarios!: string;

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
    done: {
        type: DataTypes.BOOLEAN,
    },
    idEmpleado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentarios: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
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