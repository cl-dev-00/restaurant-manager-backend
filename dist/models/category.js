"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Category extends sequelize_1.Model {
}
Category.init({
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombreCategoria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    modelName: 'category',
    timestamps: false,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true
});
exports.default = Category;
//# sourceMappingURL=category.js.map