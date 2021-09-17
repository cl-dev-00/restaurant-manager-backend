"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class MenuItem extends sequelize_1.Model {
}
MenuItem.init({
    id_item_name: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_Item: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    disponibilidad: {
        type: sequelize_1.DataTypes.INTEGER,
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
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    modelName: 'menu_item',
    timestamps: false,
    sequelize: connection_1.default,
    paranoid: true
});
exports.default = MenuItem;
//# sourceMappingURL=menu-items.js.map