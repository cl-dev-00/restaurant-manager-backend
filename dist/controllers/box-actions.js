"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoxActions = exports.createBoxAction = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const getBoxActions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.headers['date-current'];
    const dateStart = date + ' 00:00:00';
    const dateEnd = date + ' 23:59:59';
    try {
        const boxActions = yield models_1.BoxAction.findAll({
            where: {
                fecha: {
                    [sequelize_1.Op.between]: [dateStart, dateEnd]
                }
            }
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: boxActions.length > 0,
                items: boxActions
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getBoxActions = getBoxActions;
const createBoxAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const boxAction = yield models_1.BoxAction.create(payload);
        const cashRegister = yield models_1.CashRegister.findByPk(boxAction.idCashRegister);
        if (boxAction.isInput) {
            yield (cashRegister === null || cashRegister === void 0 ? void 0 : cashRegister.update({
                ingresos: cashRegister.ingresos + boxAction.monto
            }));
        }
        else {
            yield (cashRegister === null || cashRegister === void 0 ? void 0 : cashRegister.update({
                gastos: cashRegister.gastos + boxAction.monto
            }));
        }
        return res.json({
            ok: true,
            boxAction,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.createBoxAction = createBoxAction;
//# sourceMappingURL=box-actions.js.map