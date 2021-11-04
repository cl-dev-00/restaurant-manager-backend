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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrder = exports.deleteOrder = exports.changeState = exports.updateOrder = exports.createOrder = exports.getOrder = exports.getOrders = void 0;
const models_1 = require("../models");
const user_level_1 = __importDefault(require("../models/user-level"));
const OrderAttributes = ['idOrden', 'idComercial', 'nombreCliente', 'fechaOrden'];
const OrderDetialAttributes = ['idOrderDetail', 'cantidad', 'importe', 'comentario', 'done'];
const menuItemAttributes = ['id_menu_item', "idCategoria", 'nombre_item', 'precio', 'disponibilidad', 'detalles_item', 'descuento', 'url'];
const employeeAttributes = ['idEmpleado', 'nombre', 'apellido'];
const tableAttributes = ['idMesa', 'numero'];
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nivel_usuario = req.headers.nivel_usuario || '0';
    const nivel = parseInt(nivel_usuario);
    let idOrdenEstado;
    switch (nivel) {
        case 3:
            idOrdenEstado = 3;
            break;
        case 4:
            idOrdenEstado = 2;
            break;
        case 5:
            idOrdenEstado = 1;
            break;
        default:
            return res.status(400).json({
                ok: false,
            });
    }
    ;
    try {
        const Orders = yield models_1.Order.findAll({
            where: {
                idOrdenEstado,
                idComercial: 1,
                deletedAt: null
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
        const { idOrden } = yield models_1.Order.create(Object.assign(Object.assign({}, payload), { idOrdenEstado: 1 }));
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
    try {
        const { id } = req.params;
        const _a = req.body, { newMenuItems, itemsMenuEdit, itemsMenuRemove } = _a, payload = __rest(_a, ["newMenuItems", "itemsMenuEdit", "itemsMenuRemove"]);
        const order = yield models_1.Order.findByPk(id);
        yield (order === null || order === void 0 ? void 0 : order.update(Object.assign(Object.assign({}, payload), { idOrdenEstado: 1 })));
        yield models_1.OrderDetail.bulkCreate(newMenuItems);
        yield models_1.OrderDetail.destroy({
            where: {
                idOrden: id,
                id_menu_item: itemsMenuRemove
            }
        });
        for (const itemOrderUpdate of itemsMenuEdit) {
            const item = yield models_1.OrderDetail.findOne({
                where: {
                    idOrden: id,
                    id_menu_item: itemOrderUpdate.id_menu_item
                }
            });
            yield (item === null || item === void 0 ? void 0 : item.update(Object.assign(Object.assign({}, itemOrderUpdate), { done: false })));
        }
        ;
        const orderUpdated = yield models_1.Order.findOne({
            where: {
                idOrden: id,
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
            order: orderUpdated
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
const changeState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const nivel_usuario = req.headers.nivel_usuario;
    const nivel = parseInt(nivel_usuario) || 0;
    let idOrdenEstado;
    let isCashier = false;
    switch (nivel) {
        case 3:
            idOrdenEstado = 4;
            break;
        case 4:
            idOrdenEstado = 3;
            break;
        case 5:
            idOrdenEstado = 2;
            break;
        default:
            return res.status(400).json({
                ok: false,
            });
    }
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
                    attributes: employeeAttributes,
                    include: [{ model: models_1.Role, include: [{ model: user_level_1.default }] }]
                }, {
                    model: models_1.Table,
                    attributes: tableAttributes
                }]
        });
        if (nivel === 5 && order) {
            if (order.employee.role.user_level.nivel_usuario === 3) {
                idOrdenEstado = 3;
                isCashier = true;
            }
        }
        (_b = order) === null || _b === void 0 ? true : delete _b.employee.role.user_level;
        yield (order === null || order === void 0 ? void 0 : order.update(Object.assign(Object.assign({}, order), { idOrdenEstado })));
        return res.json({
            ok: true,
            order,
            isCashier
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.changeState = changeState;
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