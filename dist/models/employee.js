"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Employee extends sequelize_1.Model {
}
Employee.init({
    idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
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
    timestamps: false,
    sequelize: connection_1.default,
    paranoid: true
});
exports.default = Employee;
//# sourceMappingURL=employee.js.map