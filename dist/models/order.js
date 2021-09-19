"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const menu_items_1 = __importDefault(require("./menu-items"));
class Order extends sequelize_1.Model {
}
Order.init({
    idPedido: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCuenta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_item_name: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    importe: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    modelName: 'order',
    timestamps: false,
    sequelize: connection_1.default,
    paranoid: true
});
Order.belongsTo(menu_items_1.default, {
    foreignKey: 'id_item_name'
});
exports.default = Order;
//# sourceMappingURL=order.js.map