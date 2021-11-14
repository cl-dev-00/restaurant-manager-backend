"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const CashRegister_1 = __importDefault(require("./CashRegister"));
class BoxAction extends sequelize_1.Model {
}
BoxAction.init({
    idBoxAction: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCashRegister: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    monto: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    isInput: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    modelName: 'box_action',
    sequelize: connection_1.sequelizeConnection,
    paranoid: true,
    timestamps: true
});
BoxAction.belongsTo(CashRegister_1.default, {
    foreignKey: 'idCashRegister'
});
exports.default = BoxAction;
//# sourceMappingURL=box-actions.js.map