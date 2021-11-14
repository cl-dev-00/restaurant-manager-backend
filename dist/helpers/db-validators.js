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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasExistCashRegisterByDate = exports.hasExistCashRegister = exports.hasExistTable = exports.hasExistComercial = exports.hasExistOrderDetail = exports.hasExistOrder = exports.hasExistEmployee = exports.hasExistMenuItem = exports.hasExistCategory = void 0;
const models_1 = require("../models");
const CashRegister_1 = __importDefault(require("../models/CashRegister"));
const hasExistCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield models_1.Category.findByPk(id);
    if (!category) {
        throw new Error('La categoria buscada no existe');
    }
});
exports.hasExistCategory = hasExistCategory;
const hasExistMenuItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const menuItem = yield models_1.MenuItem.findByPk(id);
    if (!menuItem) {
        throw new Error('El item del menu buscado no existe');
    }
});
exports.hasExistMenuItem = hasExistMenuItem;
const hasExistEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield models_1.Employee.findByPk(id);
    if (!employee) {
        throw new Error('El empleado no existe');
    }
});
exports.hasExistEmployee = hasExistEmployee;
const hasExistOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield models_1.Order.findByPk(id);
    if (!account) {
        throw new Error('La ordern no existe');
    }
});
exports.hasExistOrder = hasExistOrder;
const hasExistOrderDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderDetail = yield models_1.OrderDetail.findByPk(id);
    if (!orderDetail) {
        throw new Error('El detalle de la orden no existe');
    }
});
exports.hasExistOrderDetail = hasExistOrderDetail;
const hasExistComercial = (idComercial) => __awaiter(void 0, void 0, void 0, function* () {
    const commercial = yield models_1.Commercial.findByPk(idComercial);
    if (!commercial) {
        throw new Error('La sucursal no existe');
    }
});
exports.hasExistComercial = hasExistComercial;
const hasExistTable = (idTable) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield models_1.Table.findByPk(idTable);
    if (!table) {
        throw new Error('No existe la mesa');
    }
});
exports.hasExistTable = hasExistTable;
const hasExistCashRegister = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegister = yield CashRegister_1.default.findByPk(id);
    if (!cashRegister) {
        throw new Error('No existe el registro de caja');
    }
});
exports.hasExistCashRegister = hasExistCashRegister;
const hasExistCashRegisterByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const cashRegister = yield CashRegister_1.default.findOne({
        where: {
            fecha: date
        }
    });
    if (cashRegister) {
        throw new Error('Esta caja de arqueo ya se cerro');
    }
});
exports.hasExistCashRegisterByDate = hasExistCashRegisterByDate;
//# sourceMappingURL=db-validators.js.map