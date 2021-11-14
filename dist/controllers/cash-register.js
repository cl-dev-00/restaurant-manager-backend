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
exports.updateCashRegister = exports.createCashRegister = exports.getCashRegister = exports.getCashRegisters = void 0;
const models_1 = require("../models");
const getCashRegisters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cashRegisters = yield models_1.CashRegister.findAll({
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
    }
    catch (error) {
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getCashRegisters = getCashRegisters;
const getCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.headers['date-current'];
    try {
        const cashRegister = yield models_1.CashRegister.findOne({
            where: {
                fecha: date,
                estado: true
            }
        });
        return res.json({
            ok: true,
            cashRegister
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getCashRegister = getCashRegister;
const createCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const cashRegister = yield models_1.CashRegister.create(payload);
        return res.json({
            ok: true,
            cashRegister
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.createCashRegister = createCashRegister;
const updateCashRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        const cashRegister = yield models_1.CashRegister.findByPk(id);
        yield (cashRegister === null || cashRegister === void 0 ? void 0 : cashRegister.update(payload));
        return res.json({
            ok: true,
            cashRegister
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.updateCashRegister = updateCashRegister;
//# sourceMappingURL=cash-register.js.map