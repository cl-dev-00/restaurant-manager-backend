import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { BoxAction, CashRegister } from '../models';

const getBoxActions = async (req: Request, res: Response): Promise<Response> => {

    const date = req.headers['date-current'];
    const dateStart: any = date + ' 00:00:00';
    const dateEnd: any = date + ' 23:59:59';

    try {
        const boxActions = await BoxAction.findAll({
            where: {
                fecha: {
                    [Op.between]: [dateStart, dateEnd]
                }
            }
        })

        return res.json({
            ok: true,
            collection: {
                hasItems: boxActions.length > 0,
                items: boxActions
            },
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }

}

const createBoxAction = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {
        const boxAction = await BoxAction.create(payload);
        const cashRegister = await CashRegister.findByPk(boxAction.idCashRegister);

        if (boxAction.isInput) {
            await cashRegister?.update({
                ingresos: cashRegister.ingresos + boxAction.monto
            });
        } else {
            await cashRegister?.update({
                gastos: cashRegister.gastos + boxAction.monto
            });
        }

        return res.json({
            ok: true,
            boxAction,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }

}

export {
    createBoxAction,
    getBoxActions
    
}