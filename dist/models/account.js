"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const employee_1 = __importDefault(require("./employee"));
const order_1 = __importDefault(require("./order"));
class Account extends sequelize_1.Model {
}
Account.init({
    idCuenta: {
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
    idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    modelName: 'account',
    timestamps: false,
    sequelize: connection_1.default,
    paranoid: true
});
Account.hasMany(order_1.default, {
    foreignKey: 'idCuenta'
});
Account.belongsTo(employee_1.default, {
    foreignKey: 'idEmpleado'
});
exports.default = Account;
//# sourceMappingURL=account.js.map