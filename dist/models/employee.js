"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const role_1 = __importDefault(require("./role"));
class Employee extends sequelize_1.Model {
}
Employee.init({
    idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idComercial: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idRol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    modelName: 'employee',
    timestamps: true,
    sequelize: connection_1.sequelizeConnection,
    paranoid: true,
});
Employee.belongsTo(role_1.default, {
    foreignKey: 'idRol'
});
exports.default = Employee;
//# sourceMappingURL=employee.js.map