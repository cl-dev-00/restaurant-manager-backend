import { Request, Response } from "express";
import { Server } from "socket.io";
import { Order, Employee, MenuItem, OrderDetail, Table } from "../models";

const OrderAttributes: string[] = ['idOrden', 'idComercial', 'nombreCliente', 'fechaOrden', 'done', 'pagado'];
const OrderDetialAttributes: string[] = ['idOrderDetail', 'cantidad', 'importe', 'comentario', 'done'];
const menuItemAttributes: string[] = ['nombre_item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
const employeeAttributes: string[] = ['idEmpleado', 'nombre', 'apellido'];
const tableAttributes: string[] = ['numero'];

// API REST CONTROLLER

const getOrdersUndone = async (req: Request, res: Response): Promise<Response> => {

    const { idComercial } = req.params;

    try {

        const Orders = await Order.findAll({
            where: {
                done: false,
                idComercial
            },
            attributes: OrderAttributes,
            include: [{
                model: OrderDetail, attributes: OrderDetialAttributes, include: [{
                    model: MenuItem, attributes: menuItemAttributes
                }]
            }, {
                model: Employee,
                attributes: employeeAttributes
            }, {
                model: Table,
                attributes: tableAttributes
            }]
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: Orders.length > 0 ? true : false,
                items: Orders,
                total: Orders.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const getOrdersWithoutPaying = async (req: Request, res: Response): Promise<Response> => {

    const { idComercial } = req.params;

    try {

        const Orders = await Order.findAll({
            where: {
                done: true,
                pagado: false,
                idComercial
            },
            attributes: OrderAttributes,
            include: [{
                model: OrderDetail, attributes: OrderDetialAttributes, include: [{
                    model: MenuItem, attributes: menuItemAttributes
                }]
            }, {
                model: Employee,
                attributes: employeeAttributes
            }, {
                model: Table,
                attributes: tableAttributes
            }]
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: Orders.length > 0 ? true : false,
                items: Orders,
                total: Orders.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const getOrder = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const order = await Order.findOne({
            where: {
                idOrden: id
            },
            attributes: OrderAttributes,
            include: [{
                model: OrderDetail, attributes: OrderDetialAttributes, include: [{
                    model: MenuItem, attributes: menuItemAttributes
                }]
            }, {
                model: Employee,
                attributes: employeeAttributes
            }, {
                model: Table,
                attributes: tableAttributes
            }]
        })

        return res.json({
            ok: true,
            order
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const createOrder = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        let payman_order_details = [...payload.order_details];

        delete payload.order_details;

        const { idOrden }: Order = await Order.create(payload);

        payman_order_details = payman_order_details.map(({ ...props }) => ({
            ...props,
            idOrden
        }));

        await OrderDetail.bulkCreate(payman_order_details);

        const order = await Order.findOne({
            where: {
                idOrden,
            },
            attributes: OrderAttributes,
            include: [{
                model: OrderDetail, attributes: OrderDetialAttributes, include: [{
                    model: MenuItem, attributes: menuItemAttributes
                }]
            }, {
                model: Employee,
                attributes: employeeAttributes
            }, {
                model: Table,
                attributes: tableAttributes
            }]
        })


        return res.json({
            ok: true,
            order
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const updateOrder = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const payload = req.body;

    try {

        const order = await Order.findByPk(id);

        await order?.update(payload);

        return res.json({
            ok: true,
            order
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const deleteOrder = async (req: Request, res: Response): Promise<Response> => {

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

// SOCKETS CONTROLLER

const sendOrder = (io: Server, room: string, payload: Order, action: string) => {
    io.to(room).emit(`/sockets/orders/${action}`, payload);
}

export {
    getOrdersUndone,
    getOrdersWithoutPaying,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    sendOrder,
}