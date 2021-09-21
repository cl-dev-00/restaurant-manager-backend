"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection = process.env.mariadb || 'mysql';
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const db = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: connection,
});
exports.default = db;
//# sourceMappingURL=connection.js.map