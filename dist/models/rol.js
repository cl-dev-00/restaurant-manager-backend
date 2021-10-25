"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Role extends sequelize_1.Model {
}
Role.init({
    idRol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
exports.default = Role;
//# sourceMappingURL=rol.js.map