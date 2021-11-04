import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { orders, categories, menuItems, tables, employees, roles, auth } from '../routers';
import socketController from '../sockets/controller';

export default class AppServer {

    private app: express.Application = express();
    private server = createServer(this.app);
    private io: Server = new Server(this.server, {
        cors: {
            origin: ['http://localhost:8080'],
            allowedHeaders: ['idComercial']
        }
    });
    private port: string = process.env.PORT || '4000';
    private paths = {
        auth: '/api/auth',
        categories: '/api/categories',
        menuItems: '/api/menu-items',
        orders: '/api/orders',
        tables: '/api/tables',
        employees: '/api/employees',
        roles: '/api/roles',
    }

    public constructor() {
        this.middlewares();

        this.routers();

        this.sockets();

        this.listen();
    }

    private routers(): void {
        this.app.use(this.paths.auth, auth);
        this.app.use(this.paths.categories, categories);
        this.app.use(this.paths.menuItems, menuItems);
        this.app.use(this.paths.orders, orders);
        this.app.use(this.paths.tables, tables);
        this.app.use(this.paths.employees, employees);
        this.app.use(this.paths.roles, roles);
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    private sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    private listen(): void {
        try {
            this.server.listen(this.port, () => {
                console.log(`Server running on http://localhost:${this.port}`)
            })
        } catch (error: any) {
            console.log(`Error occurred: ${error.message}`);
        }
    }
}