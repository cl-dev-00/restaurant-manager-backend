"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
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
    sequelize: connection_1.default,
    paranoid: true
});
exports.default = Category;
//# sourceMappingURL=category.js.map