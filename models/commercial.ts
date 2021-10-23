import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from '../db/connection';

interface CommercialAttributes {
    idComercial: number;
    nombre: string;
    ubicacion: string;
    telefono: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt? :Date;
}


export interface CommercialInput extends Optional<CommercialAttributes, 'idComercial'> {  }

class Commercial extends Model<CommercialAttributes, CommercialInput> {
    public idComercial!: number;
    public nombre!: string;
    public ubicacion!: string;
    public telefono!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt! :Date;
};

Commercial.init({
    idComercial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    modelName: 'commercial',
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true
});

export default Commercial;