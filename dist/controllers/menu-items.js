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
exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItemsByCategory = exports.getMenuItem = exports.getMenuItems = void 0;
const models_1 = require("../models");
const getMenuItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield models_1.MenuItem.findAll();
        return res.json({
            ok: true,
            collection: {
                hasItems: menuItems.length > 0 ? true : false,
                items: menuItems,
                page: 1,
                pages: 1,
                total: menuItems.length
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.getMenuItems = getMenuItems;
const getMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const menuItem = yield models_1.MenuItem.findByPk(id);
        return res.json({
            ok: true,
            menuItem
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.getMenuItem = getMenuItem;
const getMenuItemsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCategory } = req.params;
    try {
        const menuItems = yield models_1.MenuItem.findAll({
            where: {
                idCategoria: idCategory
            }
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: menuItems.length > 0 ? true : false,
                items: menuItems,
                page: 1,
                pages: 1,
                total: menuItems.length
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.getMenuItemsByCategory = getMenuItemsByCategory;
const createMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const menuItem = yield models_1.MenuItem.create(payload);
        return res.json({
            ok: true,
            menuItem
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.createMenuItem = createMenuItem;
const updateMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        const menuItem = yield models_1.MenuItem.findByPk(id);
        yield (menuItem === null || menuItem === void 0 ? void 0 : menuItem.update(payload));
        return res.json({
            ok: true,
            menuItem
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const menuItem = yield models_1.MenuItem.findByPk(id);
        yield (menuItem === null || menuItem === void 0 ? void 0 : menuItem.destroy());
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
        });
    }
});
exports.deleteMenuItem = deleteMenuItem;
//# sourceMappingURL=menu-items.js.map