import { Optional, Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../db/connection';


interface OrderStateAttributes {

    idOrdenEstado: number;
    estado: string;
    
    deletedAt?: Date;
    createdAt?: Date;
    updateAt?: Date;
} 

interface OrderStateInput extends Optional<OrderStateAttributes, 'idOrdenEstado'> { }

class OrderState extends Model<OrderStateAttributes, OrderStateInput> {
    idOrdenEstado!: number;
    estado!: string;
    
    deletedAt?: Date;
    createdAt?: Date;
    updateAt?: Date;
}

OrderState.init({
    idOrdenEstado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
   modelName: 'order_statu',
   paranoid: true,
   sequelize: sequelizeConnection, 
   timestamps: true,
});

export default OrderState;