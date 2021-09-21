import express from 'express';
import cors from 'cors';

import { accounts, categories, menuItems, orders } from '../routers';

export default class Server {

    private app: express.Application = express();
    private port: string = process.env.PORT || '4000';
    private paths = {
        categories: '/api/categories',
        menuItems: '/api/menu-items',
        accounts: '/api/accounts',
        orders: '/api/orders',
    }

    public constructor() {
        this.middlewares();

        this.routers();

        this.listen();
    }
    
    private routers(): void {
        this.app.use(this.paths.categories, categories);
        this.app.use(this.paths.menuItems, menuItems);
        this.app.use(this.paths.accounts, accounts);
        this.app.use(this.paths.orders, orders);
    }
    
    private middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    private listen(): void {
        try {
            this.app.listen(this.port, () => {
                console.log(`Server running on http://localhost:${this.port}`)
            })
        } catch (error: any) {
            console.log(`Error occurred: ${error.message}`);
        }
    }
}