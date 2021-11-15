"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routers_1 = require("../routers");
const controller_1 = __importDefault(require("../sockets/controller"));
class AppServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: ['http://localhost:8080', 'http://localhost:4000', 'https://restaurant-manager-cl.herokuapp.com/'],
                allowedHeaders: ['idComercial']
            }
        });
        this.port = process.env.PORT || '4000';
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            menuItems: '/api/menu-items',
            orders: '/api/orders',
            tables: '/api/tables',
            employees: '/api/employees',
            roles: '/api/roles',
            cashRegisters: '/api/cash-registers',
            boxActions: '/api/box-actions',
            uploads: '/api/uploads',
        };
        this.middlewares();
        this.routers();
        this.sockets();
        this.listen();
    }
    routers() {
        this.app.use(this.paths.auth, routers_1.auth);
        this.app.use(this.paths.categories, routers_1.categories);
        this.app.use(this.paths.menuItems, routers_1.menuItems);
        this.app.use(this.paths.orders, routers_1.orders);
        this.app.use(this.paths.tables, routers_1.tables);
        this.app.use(this.paths.employees, routers_1.employees);
        this.app.use(this.paths.roles, routers_1.roles);
        this.app.use(this.paths.cashRegisters, routers_1.cashRegisters);
        this.app.use(this.paths.boxActions, routers_1.boxActions);
        this.app.use(this.paths.uploads, routers_1.uploads);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static('public'));
        this.app.use(express_1.default.json());
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }
    sockets() {
        this.io.on('connection', (socket) => (0, controller_1.default)(socket, this.io));
    }
    listen() {
        try {
            this.server.listen(this.port, () => {
                console.log(`Server running on http://localhost:${this.port}`);
            });
        }
        catch (error) {
            console.log(`Error occurred: ${error.message}`);
        }
    }
}
exports.default = AppServer;
//# sourceMappingURL=serve.js.map