import { Optional, Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../db/connection';

interface RoleAttributes {
    idRol: number;   
    nombreRol: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface RoleInput extends Optional<RoleAttributes, 'idRol'> {}

class Role extends Model<RoleAttributes, RoleInput> {
    public idRol!: number;   
    public nombreRol!: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

Role.init({
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreRol: {    
        type: DataTypes.STRING,
        allowNull: false
    }  ,
}, {
    modelName: 'role',
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
});

export default Role;