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
exports.deleteOrders = exports.createOrders = exports.getOrdersByAccount = exports.getOrders = void 0;
const models_1 = require("../models");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield models_1.Order.findAll();
        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
                page: 1,
                pages: 1,
                total: orders.length
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getOrders = getOrders;
const getOrdersByAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const orders = yield models_1.Order.findAll({
            where: {
                idCuenta: id
            }
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
                page: 1,
                pages: 1,
                total: orders.length
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getOrdersByAccount = getOrdersByAccount;
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const orders = yield models_1.Order.bulkCreate(payload.orders);
        return res.json({
            ok: true,
            collection: {
                hasItems: orders.length > 0 ? true : false,
                items: orders,
                page: 1,
                pages: 1,
                total: orders.length
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.createOrders = createOrders;
const deleteOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.deleteOrders = deleteOrders;
//# sourceMappingURL=orders.js.map