"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class UserLevel extends sequelize_1.Model {
}
;
UserLevel.init({
    idNivelUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nivel_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    modelName: 'user_level',
    timestamps: true,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true,
});
exports.default = UserLevel;
//# sourceMappingURL=user-level.js.map