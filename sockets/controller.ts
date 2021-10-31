import { Server, Socket } from "socket.io";
import { changeStateMenuItem } from "../controllers/menu-items";
import { changeDoneOrderDetail } from "../controllers/order-detail";
import { getOrdersWithoutPaying, sendOrder } from "../controllers/orders";


const socketController = async (socket: Socket, io: Server) => {

    // console.log('Se ha conectado ' + socket.id)

    const { idcomercial } = socket.handshake.headers;

    const room: string = (idcomercial as string);

    const ordersWithoutPaying = await getOrdersWithoutPaying();

    socket.join(room);
    
    socket.on('disconnect', () => {
        // console.log('Se ha desconectado ' + socket.id)
    });

    socket.on('/sockets/orders/sendOrderKitchroom', (payload) => sendOrder(io, room, payload, 'sendNewOrder'));
    
    socket.on('/sockets/orders/doneOrder', (payload) => sendOrder(io, room, payload, 'sendDoneOrder'));

    socket.on('/sockets/order-details/changeDoneOrderDetail', changeDoneOrderDetail);

    socket.on('/sockets/menu-items/update', (payload) => changeStateMenuItem(io, room, payload));

    io.to(room).emit('/sockets/orders/without-paying', ordersWithoutPaying);
}

export default socketController;