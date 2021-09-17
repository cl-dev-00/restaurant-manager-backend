import { DataTypes, Model, Optional } from "sequelize";

import SequelizeConnection from "../db/connection";

interface EmployeeAttributes {
    idEmpleado: number,
    idRol: number,
    edad: number,
    telefono: string,
    direccion: string,
    email: string,
    nombre: string,
    url: string,
    password: string,
    username: string,

    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

interface EmployeeInput extends Optional<EmployeeAttributes, 'idEmpleado'> {  }

class Employee extends Model<EmployeeAttributes, EmployeeInput> {

    public idEmpleado!: number;
    public idRol!: number;
    public edad!: number;
    public telefono!: string;
    public direccion!: string;
    public email!: string;
    public nombre!: string;
    public url!: string;
    public password!: string;
    public username!: string;

    deletedAt!: Date;
    createdAt!: Date;
    updatedAt!: Date;

}

Employee.init({
    idEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    url: {
        type: DataTypes.TEXT,
        allowNull: false
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
    timestamps: false,
    sequelize: SequelizeConnection,
    paranoid: true
})

export default Employee;