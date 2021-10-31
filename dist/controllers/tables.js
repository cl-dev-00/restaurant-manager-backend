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
exports.deleteTable = exports.updateTable = exports.createTable = exports.getTable = exports.getTablesAvailable = exports.getTables = void 0;
const models_1 = require("../models");
const getTables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tables = yield models_1.Table.findAll({
            where: {
                idComercial: 1,
                deletedAt: null
            }
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: tables.length > 0 ? true : false,
                items: tables,
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getTables = getTables;
const getTablesAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tables = yield models_1.Table.findAll({
            where: {
                idComercial: 1,
                disponible: true,
                deletedAt: null,
            }
        });
        return res.json({
            ok: true,
            collection: {
                hasItems: tables.length > 0 ? true : false,
                items: tables,
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getTablesAvailable = getTablesAvailable;
const getTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const table = yield models_1.Table.findByPk(id);
        return res.json({
            ok: true,
            table
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.getTable = getTable;
const createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const table = yield models_1.Table.create(payload);
        return res.json({
            ok: true,
            table
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.createTable = createTable;
const updateTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        const table = yield models_1.Table.findByPk(id);
        yield (table === null || table === void 0 ? void 0 : table.update(payload));
        return res.json({
            ok: true,
            table
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.updateTable = updateTable;
const deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const table = yield models_1.Table.findByPk(id);
        table === null || table === void 0 ? void 0 : table.destroy();
        return res.json({
            ok: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
});
exports.deleteTable = deleteTable;
//# sourceMappingURL=tables.js.map