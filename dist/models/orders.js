"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const employee_1 = __importDefault(require("./employee"));
class Order extends sequelize_1.Model {
}
Order.init({
    idOrden: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreCliente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaCuenta: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comentarios: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
}, {
    modelName: 'account',
    timestamps: false,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true
});
Order.hasMany(Order, {
    foreignKey: 'idOrden'
});
Order.belongsTo(employee_1.default, {
    foreignKey: 'idEmpleado'
});
exports.default = Order;
//# sourceMappingURL=orders.js.map