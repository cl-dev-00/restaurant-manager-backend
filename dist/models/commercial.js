"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Commercial extends sequelize_1.Model {
}
;
Commercial.init({
    idComercial: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ubicacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    modelName: 'commercial',
    timestamps: false,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true
});
exports.default = Commercial;
//# sourceMappingURL=commercial.js.map