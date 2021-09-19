import { Request, Response } from "express";
import { Account, Employee, MenuItem, Order } from "../models";

const getAccounts = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        
        const accountAttributes: string[] = ['idCuenta', 'nombreCliente', 'fechaCuenta', 'done', 'comentarios'];
        const orderAttributes: string[] = ['idPedido', 'cantidad', 'importe'];
        const menuItemAttributes: string[] = ['nombre_Item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
        const employeeAttributes: string[] = ['idEmpleado', 'nombre'];
        
        const accounts = await Account.findAll({
            where: {
                done: false
            },
            attributes: accountAttributes,
            include: [ {
                model: Order, attributes: orderAttributes, include: [{
                    model: MenuItem, attributes: menuItemAttributes
                }]
            }, {
                model: Employee,
                attributes: employeeAttributes
            } ]
        }); 

        return res.json({
            ok: true,
            collection: {
                hasItems: accounts.length > 0 ? true : false,
                items: accounts,
                total: accounts.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const getAccount = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    const accountAttributes: string[] = ['idCuenta', 'nombreCliente', 'fechaCuenta', 'done', 'comentarios'];
    const orderAttributes: string[] = ['idPedido', 'cantidad', 'importe'];
    const menuItemAttributes: string[] = ['nombre_Item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
    const employeeAttributes: string[] = ['idEmpleado', 'nombre'];

    try {

        const account = await Account.findAll({
            where: {
                idCuenta: id   
            },
            attributes: accountAttributes,
            include: [{ model: Order, as: 'orders', attributes: orderAttributes, include: [{
                model: MenuItem,
                as: 'menu_item',
                attributes: menuItemAttributes
            }] }, {
                model: Employee,
                as: 'employee',
                attributes: employeeAttributes
            }]
        })

        return res.json({
            ok: true,
            account
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const createAccount = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        const account = await Account.create(payload);

        return res.json({
            ok: true,
            account
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const updateAccount = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const payload = req.body;

    try {

        const account = await Account.findByPk(id);

        await account?.update(payload);
        
        return res.json({
            ok: true,
            account
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const deleteAccount = async (req: Request, res: Response): Promise<Response> => {

    try {

        return res.json({
            ok: true
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}


export {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
}