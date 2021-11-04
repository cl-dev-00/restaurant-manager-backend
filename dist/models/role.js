"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const user_level_1 = __importDefault(require("./user-level"));
class Role extends sequelize_1.Model {
}
Role.init({
    idRol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idNivelUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nombreRol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    modelName: 'role',
    timestamps: false,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true,
});
Role.belongsTo(user_level_1.default, {
    foreignKey: 'idNivelUsuario'
});
exports.default = Role;
//# sourceMappingURL=role.js.map