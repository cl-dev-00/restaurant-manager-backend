import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from '../db/connection';
import Category from './category';

interface MenuItemAttributes {
    id_menu_item: number,
    idCategoria: number,
    idComercial: number;
    nombre_item: string,
    precio: number,
    disponibilidad: boolean,
    detalles_item: string,
    descuento: number,
    url?: string,

    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

interface MenuItemInput extends Optional<MenuItemAttributes, 'id_menu_item' | 'url'> { }
export interface MenuItemOutput extends Optional<MenuItemAttributes, 'url'> { }

class MenuItem extends Model<MenuItemAttributes, MenuItemInput> implements MenuItemAttributes {
    public id_menu_item!: number;
    public idCategoria!: number;
    public idComercial!: number;
    public nombre_item!: string;
    public precio!: number;
    public disponibilidad!: boolean;
    public detalles_item!: string;
    public descuento!: number;
    public url!: string;

    public readonly deletedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MenuItem.init({
    id_menu_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idComercial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    disponibilidad: {
        type: DataTypes.BOOLEAN,
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
}, {
    modelName: 'menu_item',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});

MenuItem.belongsTo(Category, {
    foreignKey: 'idCategoria'
})

export default MenuItem;