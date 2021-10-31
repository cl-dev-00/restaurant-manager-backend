"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tables_1 = require("../controllers/tables");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', [], tables_1.getTables);
router.get('/available', [], tables_1.getTablesAvailable);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistTable),
    middlewares_1.validFields
], tables_1.getTable);
router.post('/', [
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('El idComercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El idComercial debe ser un numero entero positivo'),
    (0, express_validator_1.check)('capacidad')
        .not().isEmpty()
        .withMessage('La capacidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un numero entero positivo'),
    (0, express_validator_1.check)('disponible')
        .not().isEmpty()
        .withMessage('Disponible es obligatorio')
        .isBoolean()
        .withMessage('Disponible debe ser un valor booleano'),
    (0, express_validator_1.check)('numero')
        .not().isEmpty()
        .withMessage('El numero es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El numero debe ser un numero entero positivo'),
    middlewares_1.validFields
], tables_1.createTable);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistTable),
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('El idComercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El idComercial debe ser un numero entero positivo'),
    (0, express_validator_1.check)('capacidad')
        .not().isEmpty()
        .withMessage('La capacidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un numero entero positivo'),
    (0, express_validator_1.check)('disponible')
        .not().isEmpty()
        .withMessage('Disponible es obligatorio')
        .isBoolean()
        .withMessage('Disponible debe ser un valor booleano'),
    (0, express_validator_1.check)('numero')
        .not().isEmpty()
        .withMessage('El numero es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El numero debe ser un numero entero positivo'),
    middlewares_1.validFields
], tables_1.updateTable);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistTable),
    middlewares_1.validFields
], tables_1.deleteTable);
exports.default = router;
//# sourceMappingURL=tables.js.map