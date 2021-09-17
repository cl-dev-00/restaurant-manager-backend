import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../db/connection'

interface CategoryAttributes {
  idCategoria: number;
  nombreCategoria: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface CategorytInput extends Optional<CategoryAttributes, 'idCategoria'> { }
// export interface CategoryOuput extends Required<CategoryAttributes> { }

class Category extends Model<CategoryAttributes, CategorytInput> implements CategoryAttributes {
  public idCategoria!: number;
  public nombreCategoria!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Category.init({
  idCategoria: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreCategoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  modelName: 'category',
  timestamps: false,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Category;