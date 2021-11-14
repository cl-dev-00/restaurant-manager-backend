import { Request, Response } from 'express';
import { generateJWT } from '../helpers/generate-jwt';
import { Commercial, Employee, Role, UserLevel } from '../models';
import bcrypt from 'bcrypt';

const employeeAttributes: string[] = ['idEmpleado', 'idComercial', 'nombre', 'apellido', 'username', 'password'];
const roleAttributes: string[] = ['nombreRol'];
const userLevelAttributes: string[] = ['nivel_usuario'];
const commercialAttributes: string[] = ['nombre', 'ubicacion', 'telefono'];

const loginEmployee = async (req: Request, res: Response): Promise<Response> => {

    const { username, password: passwordInput } = req.body;

    try {
        const employee = await Employee.findOne({
            where: {
                username
            },
            attributes: employeeAttributes,
            include: [{
                model: Role, attributes: roleAttributes, include: [
                    { model: UserLevel, attributes: userLevelAttributes }
                ]
            }, {
                model: Commercial, attributes: commercialAttributes
            }],

        });


        if (!employee) {
            return res.status(400).json({
                ok: false,
            });
        }

        const verifyPassword = bcrypt.compareSync(passwordInput, employee.password);

        if (!verifyPassword) {
            return res.status(400).json({
                ok: false,
            });
        }

        const { password, ...props } = (employee as any).dataValues;

        const token = await generateJWT({ ...props });

        return res.json({
            ok: true, username, password,
            token,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }
}

export {
    loginEmployee,
}