import { Request, Response } from "express";

import {  OrderDetail } from "../models";

// API REST CONTROLLER

const getOrderDetailByOrder = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const orders = await OrderDetail.findAll({
            where: {
                idOrden: id,
                deletedAt: null
            }
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const createOrderDetails = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        const orders = await OrderDetail.bulkCreate(payload.orders);

        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }
}

const deleteOrderDetails = async (req: Request, res: Response): Promise<Response> => {

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

// SOCKETS CONTROLLER

const changeDoneOrderDetail = async (id: number) => {


    try {

        const orderDetail = await OrderDetail.findByPk(id);

        const orderDetailUpdate = { ...orderDetail };

        orderDetailUpdate.done = !orderDetail?.done;

        await orderDetail?.update(orderDetailUpdate);


    } catch (error) {
        console.log(error);
    }

}

export {
    getOrderDetailByOrder,
    createOrderDetails,
    deleteOrderDetails,
    changeDoneOrderDetail,
}