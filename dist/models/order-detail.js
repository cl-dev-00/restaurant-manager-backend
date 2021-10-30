"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const menu_items_1 = __importDefault(require("./menu-items"));
class OrderDetail extends sequelize_1.Model {
}
OrderDetail.init({
    idOrderDetail: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idOrden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_menu_item: {
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
    comentario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
}, {
    modelName: 'order_detail',
    timestamps: true,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true
});
OrderDetail.belongsTo(menu_items_1.default, {
    foreignKey: 'id_menu_item'
});
exports.default = OrderDetail;
//# sourceMappingURL=order-detail.js.map