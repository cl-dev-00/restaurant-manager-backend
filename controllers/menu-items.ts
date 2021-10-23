import { Request, Response } from "express";
import { Server } from "socket.io";

import { MenuItem } from "../models";

// REST API

const getMenuItems = async (req: Request, res: Response): Promise<Response> => {

    const { idComercial } = req.params;

    try {

        const menuItems = await MenuItem.findAll({
            where: {
                idComercial
            }
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: menuItems.length > 0 ? true : false,
                items: menuItems,
                total: menuItems.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
        });
    }


}

const getMenuItemsAvailable = async (req: Request, res: Response): Promise<Response> => {

    const { idComercial } = req.params;

    try {

        const menuItems = await MenuItem.findAll({
            where: {
                idComercial,
                disponibilidad: true
            }
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: menuItems.length > 0 ? true : false,
                items: menuItems,
                total: menuItems.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
        });
    }


}

const getMenuItem = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const menuItem = await MenuItem.findByPk(id);

        return res.json({
            ok: true,
            menuItem
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
        });
    }


}
const getMenuItemsByCategory = async (req: Request, res: Response): Promise<Response> => {

    const { idCategory } = req.params;

    try {

        const menuItems = await MenuItem.findAll({
            where: {
                idCategoria: idCategory
            }
        })

        return res.json({
            ok: true,
            collection: {
                hasItems: menuItems.length > 0 ? true : false,
                items: menuItems,
                total: menuItems.length
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
        });
    }


}

const createMenuItem = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        const menuItem = await MenuItem.create(payload);

        return res.json({
            ok: true,
            menuItem
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
        });
    }


}
const updateMenuItem = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const payload = req.body;

    try {

        const menuItem = await MenuItem.findByPk(id);

        await menuItem?.update(payload);

        return res.json({
            ok: true,
            menuItem
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
        });
    }


}
const deleteMenuItem = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const menuItem = await MenuItem.findByPk(id);

        await menuItem?.destroy();

        return res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
        });
    }


}

// SOCKETS

const changeStateMenuItem = async (io: Server, room: string, payload: number[]) => {

    try {

        let menuItemChanged: MenuItem[] = [];

        for (const idMenuItem of payload) {
            const menuItem = await MenuItem.findByPk(idMenuItem);

            if (menuItem) {
                menuItem!.disponibilidad = !menuItem?.disponibilidad;

                await menuItem?.update((menuItem as any).dataValues);
                menuItemChanged = [...menuItemChanged, (menuItem as any).dataValues];
            } else {
                throw new Error('El menu item no existe');
            }

        }

        io.to(room).emit('/sockets/menu-items/changeState', menuItemChanged);

    } catch (error) {
        console.log(error)
    }
}

export {
    getMenuItems,
    getMenuItemsAvailable,
    getMenuItem,
    getMenuItemsByCategory,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    changeStateMenuItem
}