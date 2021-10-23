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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrder = exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrder = exports.getOrdersWithoutPaying = exports.getOrdersUndone = void 0;
const models_1 = require("../models");
const OrderAttributes = ['idOrden', 'idComercial', 'nombreCliente', 'fechaOrden', 'done', 'pagado'];
const OrderDetialAttributes = ['idOrderDetail', 'cantidad', 'importe', 'comentario', 'done'];
const menuItemAttributes = ['nombre_item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
const employeeAttributes = ['idEmpleado', 'nombre', 'apellido'];
const tableAttributes = ['numero'];
const getOrdersUndone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idComercial } = req.params;
    try {
        const Orders = yield models_1.Order.findAll({
            where: {
                done: false,
                idComercial
            },
            attributes: OrderAttributes,
            include: [{
                    model: models_1.OrderDetail, attributes: OrderDetialAttributes, include: [{
                            model: models_1.MenuItem, attributes: menuItemAttributes
                        }]
                }, {
                    model: models_1.Employee,
                    attributes: employeeAttributes
                }, {
                    model: models_1.Table,
                    attributes: tableAttributes
                }]
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: Orders.length > 0 ? true : false,
                items: Orders,
                total: Orders.length
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
exports.getOrdersUndone = getOrdersUndone;
const getOrdersWithoutPaying = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idComercial } = req.params;
    try {
        const Orders = yield models_1.Order.findAll({
            where: {
                done: true,
                pagado: false,
                idComercial
            },
            attributes: OrderAttributes,
            include: [{
                    model: models_1.OrderDetail, attributes: OrderDetialAttributes, include: [{
                            model: models_1.MenuItem, attributes: menuItemAttributes
                        }]
                }, {
                    model: models_1.Employee,
                    attributes: employeeAttributes
                }, {
                    model: models_1.Table,
                    attributes: tableAttributes
                }]
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: Orders.length > 0 ? true : false,
                items: Orders,
                total: Orders.length
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
exports.getOrdersWithoutPaying = getOrdersWithoutPaying;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield models_1.Order.findOne({
            where: {
                idOrden: id
            },
            attributes: OrderAttributes,
            include: [{
                    model: models_1.OrderDetail, attributes: OrderDetialAttributes, include: [{
                            model: models_1.MenuItem, attributes: menuItemAttributes
                        }]
                }, {
                    model: models_1.Employee,
                    attributes: employeeAttributes
                }, {
                    model: models_1.Table,
                    attributes: tableAttributes
                }]
        });
        return res.json({
            ok: true,
            order
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getOrder = getOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        let payman_order_details = [...payload.order_details];
        delete payload.order_details;
        const { idOrden } = yield models_1.Order.create(payload);
        payman_order_details = payman_order_details.map((_a) => {
            var props = __rest(_a, []);
            return (Object.assign(Object.assign({}, props), { idOrden }));
        });
        yield models_1.OrderDetail.bulkCreate(payman_order_details);
        const order = yield models_1.Order.findOne({
            where: {
                idOrden,
            },
            attributes: OrderAttributes,
            include: [{
                    model: models_1.OrderDetail, attributes: OrderDetialAttributes, include: [{
                            model: models_1.MenuItem, attributes: menuItemAttributes
                        }]
                }, {
                    model: models_1.Employee,
                    attributes: employeeAttributes
                }, {
                    model: models_1.Table,
                    attributes: tableAttributes
                }]
        });
        return res.json({
            ok: true,
            order
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        const order = yield models_1.Order.findByPk(id);
        yield (order === null || order === void 0 ? void 0 : order.update(payload));
        return res.json({
            ok: true,
            order
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteOrder = deleteOrder;
const sendOrder = (io, room, payload, action) => {
    io.to(room).emit(`/sockets/orders/${action}`, payload);
};
exports.sendOrder = sendOrder;
//# sourceMappingURL=orders.js.map