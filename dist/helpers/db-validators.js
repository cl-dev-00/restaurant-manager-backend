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
exports.hasExistOrder = exports.hasExistAccount = exports.hasExistEmployee = exports.hasExistMenuItem = exports.hasExistCategory = void 0;
const models_1 = require("../models");
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
const hasExistAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield models_1.Account.findByPk(id);
    if (!account) {
        throw new Error('La cuenta no existe');
    }
});
exports.hasExistAccount = hasExistAccount;
const hasExistOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield models_1.Order.findByPk(id);
    if (!order) {
        throw new Error('La orden no existe');
    }
});
exports.hasExistOrder = hasExistOrder;
//# sourceMappingURL=db-validators.js.map