import { Dialect, Sequelize } from 'sequelize';

const connection: Dialect  = (process.env.mariadb as Dialect) || 'mysql';
const host: string = process.env.DB_HOST!;
const username: string = process.env.DB_USERNAME!;
const password: string = process.env.DB_PASSWORD!;
const database: string = process.env.DB_DATABASE!;

const db = new Sequelize(database, username, password, {
    host: host,
    dialect: connection,
    logging: false
});


export default db;