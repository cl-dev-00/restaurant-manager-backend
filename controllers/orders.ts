import { Request, Response } from "express";
import { Op } from "sequelize";
import { Server } from "socket.io";
import { Order, Employee, MenuItem, OrderDetail, Table, Role } from "../models";
import UserLevel from '../models/user-level';

const OrderAttributes: string[] = ['idOrden', 'idComercial', 'nombreCliente', 'fechaOrden', 'importe', 'total'];
const OrderDetialAttributes: string[] = ['idOrderDetail', 'cantidad', 'importe', 'comentario', 'done'];
const menuItemAttributes: string[] = ['id_menu_item', "idCategoria", 'nombre_item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
const employeeAttributes: string[] = ['idEmpleado', 'nombre', 'apellido'];
const tableAttributes: string[] = ['idMesa', 'numero'];

// API REST CONTROLLER

const getOrders = async (req: Request, res: Response): Promise<Response> => {

    const nivel_usuario: string = (req.headers.nivel_usuario as string) || '0';

    const nivel: number = parseInt(nivel_usuario);

    const currentDate = req.headers['date-current'];

    if (!currentDate) {
        return res.status(400).json({
            ok: false,
        });
    }

    const startDate: any = currentDate + " 00:00:00";
    const endDate: any = currentDate + " 23:59:59";

    let idOrdenEstado: number;

    switch (nivel) {
        case 3:
            idOrdenEstado = 3;
            break;
        case 4:
            idOrdenEstado = 2;
            break;
        case 5:
            idOrdenEstado = 1;
            break;

        default:
            return res.status(400).json({
                ok: false,
            });
    };

    try {

        const Orders = await Order.findAll({
            where: {
                idOrdenEstado,
                idComercial: 1,
                deletedAt: null,
                fechaOrden: {
                    [Op.between]: [startDate, endDate]
                }
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
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const getOrdersPaidout = async (req: Request, res: Response): Promise<Response> => {

    const currentDate = req.headers['date-current'];

    const startDate: any = currentDate + " 00:00:00";
    const endDate: any = currentDate + " 23:59:59";

    try {

        const orders = await Order.findAll({
            where: {
                idComercial: 1,
                deletedAt: null,
                idOrdenEstado: 4,
                fechaOrden: {
                    [Op.between]: [startDate, endDate]
                }
            },
        });

        const items = (orders as any).map(({ dataValues: { fechaOrden, ...props } }: any) => {
            return {
                ...props,
                fechaOrden: fechaOrden.toISOString().slice(0, 19).replace("T", " ").split(","),
            }
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: items.length > 0,
                items,
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

        const { idOrden }: Order = await Order.create({ ...payload, idOrdenEstado: 1 });

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
        });


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

    try {
        const { id } = req.params;
        const { newMenuItems, itemsMenuEdit, itemsMenuRemove, ...payload } = req.body;

        const order = await Order.findByPk(id);

        await order?.update({ ...payload, idOrdenEstado: 1 });

        await OrderDetail.bulkCreate(newMenuItems);

        await OrderDetail.destroy({
            where: {
                idOrden: id,
                id_menu_item: itemsMenuRemove
            }
        });

        for (const itemOrderUpdate of itemsMenuEdit) {

            const item = await OrderDetail.findOne({
                where: {
                    idOrden: id,
                    id_menu_item: itemOrderUpdate.id_menu_item
                }
            });

            await item?.update({ ...itemOrderUpdate, done: false })

        };

        const orderUpdated = await Order.findOne({
            where: {
                idOrden: id,
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
            order: orderUpdated

        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const changeState = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const { importe, total } = req.body;

    const nivel_usuario: string = req.headers.nivel_usuario as string;

    const nivel = parseInt(nivel_usuario) || 0;

    let idOrdenEstado: number;
    let isCashier = false;

    
    try {
        switch (nivel) {
            case 3:
                idOrdenEstado = 4;
                break;
            case 4:
                idOrdenEstado = 3;
                break;
            case 5:
                idOrdenEstado = 2;
                break;
    
            default:
                return res.status(400).json({
                    ok: false,
                });
        }
        
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
                attributes: employeeAttributes,
                include: [{ model: Role, include: [{ model: UserLevel }] }]
            }, {
                model: Table,
                attributes: tableAttributes
            }]
        })

        if (nivel === 5 && order) {

            if ((order as any).employee.role.user_level.nivel_usuario === 3) {
                idOrdenEstado = 4;
                isCashier = true;
            }

        }

        await order?.update({
            idOrdenEstado,
            importe,
            total
        });

        const { employee, ...props } = (order as any).dataValues;
        const { role, ...propsEmployee } = employee.dataValues;
        const { user_level, ...propsRole } = role.dataValues;

        // const { employee: { role: { user_level } }, ...props } = (order as any).dataValues;

        return res.json({
            ok: true,
            order: {
                ...props,
                employee: {
                    ...propsEmployee,
                    role: {
                        ...propsRole
                    }
                },

            },
            isCashier
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
    getOrders,
    getOrdersPaidout,
    getOrder,
    createOrder,
    updateOrder,
    changeState,
    deleteOrder,
    sendOrder,
}