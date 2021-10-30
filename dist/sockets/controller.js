"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_items_1 = require("../controllers/menu-items");
const order_detail_1 = require("../controllers/order-detail");
const orders_1 = require("../controllers/orders");
const socketController = (socket, io) => {
    const { idcomercial } = socket.handshake.headers;
    const room = idcomercial;
    socket.join(room);
    socket.on('disconnect', () => {
    });
    socket.on('/sockets/orders/sendOrderKitchroom', (payload) => (0, orders_1.sendOrder)(io, room, payload, 'sendNewOrder'));
    socket.on('/sockets/orders/doneOrder', (payload) => (0, orders_1.sendOrder)(io, room, payload, 'sendDoneOrder'));
    socket.on('/sockets/order-details/changeDoneOrderDetail', order_detail_1.changeDoneOrderDetail);
    socket.on('/sockets/menu-items/update', (payload) => (0, menu_items_1.changeStateMenuItem)(io, room, payload));
};
exports.default = socketController;
//# sourceMappingURL=controller.js.map