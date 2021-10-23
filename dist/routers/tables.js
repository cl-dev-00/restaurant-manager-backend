"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tables_1 = require("../controllers/tables");
const router = (0, express_1.Router)();
router.get('/commercial/:idComercial', [], tables_1.getTablesByComercial);
router.get('/available/commercial/:idComercial', [], tables_1.getTablesAvailable);
router.get('/:id', [], tables_1.getTable);
router.get('', []);
router.post('/', [], tables_1.createTable);
router.put('/:id', [], tables_1.updateTable);
router.delete('/:id', [], tables_1.deleteTable);
exports.default = router;
//# sourceMappingURL=tables.js.map