import { DataTypes, Model, Optional } from 'sequelize';

import { sequelizeConnection } from '../db/connection';
import MenuItem from './menu-items';

interface OrderDetailAttributes {

    idOrderDetail: number,
    idOrden: number,
    id_menu_item: number,
    cantidad: number,
    importe: number,
    comentario: string;
    done: Boolean;
    
    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
    
}

interface OrderDetailInput extends Optional<OrderDetailAttributes, 'idOrderDetail'> { }

class OrderDetail extends Model<OrderDetailAttributes, OrderDetailInput> implements OrderDetailAttributes {
    
    public idOrderDetail!: number;
    public idOrden!: number;
    public id_menu_item!: number;
    public cantidad!: number;
    public importe!: number;
    public comentario!: string;
    public done!: Boolean;

    public readonly deletedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

OrderDetail.init({
    idOrderDetail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_menu_item: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    importe: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    
}, {
    modelName: 'order_detail',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true

});

OrderDetail.belongsTo(MenuItem, {
    foreignKey: 'id_menu_item'
});

export default OrderDetail;