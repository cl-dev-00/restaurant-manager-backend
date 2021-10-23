import { Optional, Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../db/connection';


interface TableAttributes {
    idMesa: number;
    idComercial: number;
    capacidad: number;
    disponible: boolean;
    numero: number;

    created?: Date;
    updated?: Date;
    deleted?: Date;
}

interface TableInput extends Optional<TableAttributes, 'idMesa'> { }

class Table extends Model<TableAttributes, TableInput> {
    public idMesa!: number;
    public idComercial!: number;
    public capacidad!: number;
    public disponible!: boolean;
    public numero!: number;
    
    public readonly created!: Date;
    public readonly updated!: Date;
    public readonly deleted!: Date;
}

Table.init({
    idMesa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idComercial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    modelName: 'table',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
});

export default Table;