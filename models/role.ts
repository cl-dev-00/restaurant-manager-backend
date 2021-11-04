import { Optional, Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../db/connection';
import UserLevel from './user-level';

interface RoleAttributes {
    idRol: number;   
    idNivelUsuario: number;
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
    idNivelUsuario: {    
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombreRol: {    
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    modelName: 'role',
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
});

Role.belongsTo(UserLevel, {
    foreignKey: 'idNivelUsuario'
})

export default Role;