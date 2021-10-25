import { DataTypes, Model, Optional } from "sequelize";

import { sequelizeConnection } from "../db/connection";
import Role from './role';

interface EmployeeAttributes {
    idEmpleado: number,
    idComercial: number,
    idRol: number,
    edad: number,
    telefono: string,
    direccion: string,
    email: string,
    nombre: string,
    apellido: string,
    url: string,
    password: string,
    username: string,

    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

interface EmployeeInput extends Optional<EmployeeAttributes, 'idEmpleado'> { }

class Employee extends Model<EmployeeAttributes, EmployeeInput> {

    public idEmpleado!: number;
    public idComercial!: number;
    public idRol!: number;
    public edad!: number;
    public telefono!: string;
    public direccion!: string;
    public email!: string;
    public nombre!: string;
    public apellido!: string;
    public url?: string;
    public password!: string;
    public username!: string;

    public readonly deletedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Employee.init({
    idEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idComercial: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    modelName: 'employee',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
})

Employee.belongsTo(Role, {
    foreignKey: 'idRol'
});

export default Employee;