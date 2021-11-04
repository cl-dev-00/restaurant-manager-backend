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
exports.changeDoneOrderDetail = void 0;
const models_1 = require("../models");
const changeDoneOrderDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderDetail = yield models_1.OrderDetail.findByPk(id);
        const orderDetailUpdate = Object.assign({}, orderDetail);
        orderDetailUpdate.done = !(orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.done);
        yield (orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.update(orderDetailUpdate));
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeDoneOrderDetail = changeDoneOrderDetail;
//# sourceMappingURL=order-detail.js.map