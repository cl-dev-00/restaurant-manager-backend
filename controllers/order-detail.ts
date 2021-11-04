import {  OrderDetail } from "../models";

// SOCKETS CONTROLLER

const changeDoneOrderDetail = async (id: number) => {


    try {

        const orderDetail = await OrderDetail.findByPk(id);

        const orderDetailUpdate = { ...orderDetail };

        orderDetailUpdate.done = !orderDetail?.done;

        await orderDetail?.update(orderDetailUpdate);


    } catch (error) {
        console.log(error);
    }

}

export {
    changeDoneOrderDetail,
}