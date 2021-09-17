import { Request, Response } from "express";

import { Account, Order } from "../models";

const getOrders = async (req: Request, res: Response): Promise<Response> => {

    try {

        const orders = await Order.findAll();

        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
                page: 1,
                pages: 1,
                total: orders.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const getOrdersByAccount = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const orders = await Order.findAll({
            where: {
                idCuenta: id
            }
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
                page: 1,
                pages: 1,
                total: orders.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const createOrders = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        const orders = await Order.bulkCreate(payload.orders);

        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
                page: 1,
                pages: 1,
                total: orders.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }   
}

const deleteOrders = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        return res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }   
}

export {
    getOrders,
    getOrdersByAccount,
    createOrders,
    deleteOrders,
}