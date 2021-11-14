import { Request, Response } from 'express';
import { CashRegister } from '../models';


const getCashRegisters = async (req: Request, res: Response): Promise<Response> => {

    try {

        const cashRegisters = await CashRegister.findAll({
            where: {
                deletedAt: null,
                estado: false,
            }
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: cashRegisters.length > 0,
                items: cashRegisters
            }
        });
    } catch (error) {
        return res.status(500).json({
            ok: false
        });
    }

}

const getCashRegister = async (req: Request, res: Response): Promise<Response> => {

    const date = req.headers['date-current'];

    try {

        const cashRegister = await CashRegister.findOne({
            where: {
                fecha: date,
                estado: true
            }
        })

        return res.json({
            ok: true,
            cashRegister
        });
    } catch (error) {
        return res.status(500).json({
            ok: false
        });
    }

}

const createCashRegister = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        const cashRegister = await CashRegister.create(payload);

        return res.json({
            ok: true,
            cashRegister
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

const updateCashRegister = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const payload = req.body;

    try {

        const cashRegister = await CashRegister.findByPk(id);

        await cashRegister?.update(payload);

        return res.json({
            ok: true,
            cashRegister
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        });
    }

}

export {
    getCashRegisters,
    getCashRegister,
    createCashRegister,
    updateCashRegister
}