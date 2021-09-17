import { DataTypes, Model, Optional } from "sequelize";
import SequelizeConnection from '../db/connection';

interface MenuItemAttributes {
    id_item_name: number,
    nombre_Item: string,
    precio: number,
    disponibilidad: number,
    detalles_item: string,
    descuento: number,
    url?: string,
    idCategoria: number,

    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

interface MenuItemInput extends Optional<MenuItemAttributes, 'id_item_name' | 'url'> { }
export interface MenuItemOutput extends Optional<MenuItemAttributes, 'url'> {}

class MenuItem extends Model<MenuItemAttributes, MenuItemInput> implements MenuItemAttributes {
    public id_item_name!: number;
    public nombre_Item!: string;
    public precio!: number;
    public disponibilidad!: number;
    public detalles_item!: string;
    public descuento!: number;
    public url!: string;
    public idCategoria!: number;

    public readonly deletedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuItem.init({
    id_item_name: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_Item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    disponibilidad: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    detalles_item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descuento: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    modelName: 'menu_item',
    timestamps: false,
    sequelize: SequelizeConnection,
    paranoid: true
});

export default MenuItem;