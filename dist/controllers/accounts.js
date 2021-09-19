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
exports.deleteAccount = exports.updateAccount = exports.createAccount = exports.getAccount = exports.getAccounts = void 0;
const models_1 = require("../models");
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountAttributes = ['idCuenta', 'nombreCliente', 'fechaCuenta', 'done', 'comentarios'];
        const orderAttributes = ['idPedido', 'cantidad', 'importe'];
        const menuItemAttributes = ['nombre_Item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
        const employeeAttributes = ['idEmpleado', 'nombre'];
        const accounts = yield models_1.Account.findAll({
            where: {
                done: false
            },
            attributes: accountAttributes,
            include: [{
                    model: models_1.Order, attributes: orderAttributes, include: [{
                            model: models_1.MenuItem, attributes: menuItemAttributes
                        }]
                }, {
                    model: models_1.Employee,
                    attributes: employeeAttributes
                }]
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: accounts.length > 0 ? true : false,
                items: accounts,
                total: accounts.length
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
exports.getAccounts = getAccounts;
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const accountAttributes = ['idCuenta', 'nombreCliente', 'fechaCuenta', 'done', 'comentarios'];
    const orderAttributes = ['idPedido', 'cantidad', 'importe'];
    const menuItemAttributes = ['nombre_Item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
    const employeeAttributes = ['idEmpleado', 'nombre'];
    try {
        const account = yield models_1.Account.findAll({
            where: {
                idCuenta: id
            },
            attributes: accountAttributes,
            include: [{ model: models_1.Order, as: 'orders', attributes: orderAttributes, include: [{
                            model: models_1.MenuItem,
                            as: 'menu_item',
                            attributes: menuItemAttributes
                        }] }, {
                    model: models_1.Employee,
                    as: 'employee',
                    attributes: employeeAttributes
                }]
        });
        return res.json({
            ok: true,
            account
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getAccount = getAccount;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const account = yield models_1.Account.create(payload);
        return res.json({
            ok: true,
            account
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.createAccount = createAccount;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        const account = yield models_1.Account.findByPk(id);
        yield (account === null || account === void 0 ? void 0 : account.update(payload));
        return res.json({
            ok: true,
            account
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.updateAccount = updateAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({
            ok: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=accounts.js.map