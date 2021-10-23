"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Table extends sequelize_1.Model {
}
Table.init({
    idMesa: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idComercial: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    capacidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    disponible: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    numero: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    modelName: 'table',
    timestamps: true,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true,
});
exports.default = Table;
//# sourceMappingURL=table.js.map