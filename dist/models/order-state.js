"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class OrderState extends sequelize_1.Model {
}
OrderState.init({
    idOrdenEstado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    modelName: 'order_statu',
    paranoid: true,
    sequelize: connection_1.sequelizeConnection,
    timestamps: true,
});
exports.default = OrderState;
//# sourceMappingURL=order-state.js.map