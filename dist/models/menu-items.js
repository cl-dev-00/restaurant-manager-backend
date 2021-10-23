"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class MenuItem extends sequelize_1.Model {
}
MenuItem.init({
    id_menu_item: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    idComercial: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_item: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    disponibilidad: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    detalles_item: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descuento: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
}, {
    modelName: 'menu_item',
    timestamps: false,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true
});
exports.default = MenuItem;
//# sourceMappingURL=menu-items.js.map