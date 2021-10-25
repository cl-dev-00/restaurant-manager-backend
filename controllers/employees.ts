import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import { Employee, Role } from "../models";

const rolAttributes: string[] = ['idRol', 'nombreRol'];

const saltRounds: number = 10;

const getEmployees = async (req: Request, res: Response): Promise<Response> => {

    try {

        const employees = await Employee.findAll({
            where: {
                idComercial: 1,
                deletedAt: null
            },
            include: [{ model: Role, attributes: rolAttributes }],
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: employees.length > 0,
                items: employees,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }

}

const getEmployee = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {
        const employee = await Employee.findOne({
            where: {
                idEmpleado: id,
            },
            include: [{ model: Role, attributes: rolAttributes }],
            attributes: { exclude: ["password"] }
        });

        return res.json({
            ok: true,
            employee
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }

}
const createEmployee = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        payload.password = bcrypt.hashSync(payload.password, saltRounds);
        
        const employee = await Employee.create(payload);
        
        return res.json({
            ok: true,
            employee
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
    
}

const updateEmployee = async (req: Request, res: Response): Promise<Response> => {
    
    const { id } = req.params;
    const payload = req.body;
    
    try {
        
        const employee = await Employee.findByPk(id);
        
        if(payload.password) {
            payload.password = bcrypt.hashSync(payload.password, saltRounds);
        }
        
        await employee?.update(payload);
        
        return res.json({
            ok: true,
            employee
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
    
}

const deleteEmployee = async (req: Request, res: Response): Promise<Response> => {
    
    const { id } = req.params;

    try {
        const employee = await Employee.findByPk(id);

        await employee?.destroy();

        return res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }

}

export {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}