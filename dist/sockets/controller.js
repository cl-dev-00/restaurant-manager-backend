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
const menu_items_1 = require("../controllers/menu-items");
const order_detail_1 = require("../controllers/order-detail");
const orders_1 = require("../controllers/orders");
const socketController = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    const { idcomercial } = socket.handshake.headers;
    const room = idcomercial;
    const ordersWithoutPaying = yield (0, orders_1.getOrdersWithoutPaying)();
    socket.join(room);
    socket.on('disconnect', () => {
    });
    socket.on('/sockets/orders/sendOrderKitchroom', (payload) => (0, orders_1.sendOrder)(io, room, payload, 'sendNewOrder'));
    socket.on('/sockets/orders/doneOrder', (payload) => (0, orders_1.sendOrder)(io, room, payload, 'sendDoneOrder'));
    socket.on('/sockets/order-details/changeDoneOrderDetail', order_detail_1.changeDoneOrderDetail);
    socket.on('/sockets/menu-items/update', (payload) => (0, menu_items_1.changeStateMenuItem)(io, room, payload));
    io.to(room).emit('/sockets/orders/without-paying', ordersWithoutPaying);
});
exports.default = socketController;
//# sourceMappingURL=controller.js.map