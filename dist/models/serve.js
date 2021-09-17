"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = require("../routers");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.paths = {
            categories: '/api/categories',
            menuItems: '/api/menu-items',
            accounts: '/api/accounts',
            orders: '/api/orders',
        };
        this.middlewares();
        this.routers();
        this.listen();
    }
    routers() {
        this.app.use(this.paths.categories, routers_1.categories);
        this.app.use(this.paths.menuItems, routers_1.menuItems);
        this.app.use(this.paths.accounts, routers_1.accounts);
        this.app.use(this.paths.orders, routers_1.orders);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static('public'));
        this.app.use(express_1.default.json());
    }
    listen() {
        try {
            this.app.listen(this.port, () => {
                console.log(`Server running on http://localhost:${this.port}`);
            });
        }
        catch (error) {
            console.log(`Error occurred: ${error.message}`);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=serve.js.map