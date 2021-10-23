"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketController = (socket, io) => {
    console.log('Se ha conectado ' + socket.id);
    const { idcomercial } = socket.handshake.headers;
    const room = idcomercial;
    socket.join(room);
    io.to(room).emit('sala ' + room, {
        mensaje: 'ehhhhhhhhhh'
    });
    console.log(socket.rooms);
    socket.on('disconnect', () => {
        console.log('Se ha desconectado ' + socket.id);
    });
    socket.on('/sockets/orders/newOrder', (payload) => {
        io.to(room).emit('/sockets/orders/sendNewOrder', payload);
    });
};
exports.default = socketController;
//# sourceMappingURL=socketController.js.map