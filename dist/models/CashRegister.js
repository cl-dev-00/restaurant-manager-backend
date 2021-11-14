"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class CashRegister extends sequelize_1.Model {
}
CashRegister.init({
    idCashRegister: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idComercial: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hora_inicio: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    hora_final: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    saldo_inicial: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    saldo_final: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    ingresos: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    gastos: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    efectivo: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    creditos: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    dinero_real: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    faltante: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
}, {
    modelName: 'cash_register',
    sequelize: connection_1.sequelizeConnection,
    paranoid: true,
    timestamps: true,
});
exports.default = CashRegister;
//# sourceMappingURL=CashRegister.js.map