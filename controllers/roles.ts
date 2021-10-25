import { Request, Response } from "express";
import { Role } from "../models";


const getRoles = async (req: Request, res: Response): Promise<Response> => {

    try {

        const roles = await Role.findAll({
            where: {
                deletedAt: null
            }
        });

        return res.json({
            ok: true,
            collection: {
                items: roles,
                hasItems: roles.length > 0
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
}

export {
    getRoles
}