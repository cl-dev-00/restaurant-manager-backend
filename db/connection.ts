import { Dialect, Sequelize } from 'sequelize';

const connection: Dialect  = (process.env.mariadb as Dialect) || 'mysql';
const host: string = process.env.DB_HOST || 'localhost';
const username: string = process.env.DB_USERNAME || 'root';
const password: string = process.env.DB_PASSWORD || '';
const database: string = process.env.DB_DATABASE || 'restaurant-manager';

const db = new Sequelize(database, username, password, {
    host: host,
    dialect: connection,
    // logging: false
});


export default db;