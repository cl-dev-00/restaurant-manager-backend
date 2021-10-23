"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketController = (socket) => {
    console.log('Se ha conectado ' + socket.id);
    socket.on('disconnect', () => {
        console.log('Se ha desconectado ' + socket.id);
    });
};
exports.default = socketController;
//# sourceMappingURL=socketController.js.map