"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection = process.env.mariadb || 'mysql';
<<<<<<< HEAD
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
=======
const host = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_DATABASE || 'restaurant-manager';
>>>>>>> 6438891a1e390e965339fd7f7277c68e2e247b5b
const db = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: connection,
    logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map