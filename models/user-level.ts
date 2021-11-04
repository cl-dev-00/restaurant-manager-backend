import { Optional, Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../db/connection';


interface UserLevelAttributes {

    idNivelUsuario: number;
    nivel_usuario: number;
    
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserLevelInput extends Optional<UserLevelAttributes, 'idNivelUsuario'> {  }

class UserLevel extends Model<UserLevelAttributes, UserLevelInput> {
    idNivelUsuario!: number;
    nivel_usuario!: number;
    
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

UserLevel.init({
    idNivelUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nivel_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    modelName: 'user_level',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
});

export default UserLevel;