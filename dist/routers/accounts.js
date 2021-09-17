"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getAccounts);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistAccount),
    middlewares_1.validFields
], controllers_1.getAccount);
router.post('/', [
    (0, express_validator_1.check)('nombreCliente')
        .not().isEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    (0, express_validator_1.check)('fechaCuenta')
        .not().isEmpty()
        .withMessage('La fecha de la cuenta es obligatorio')
        .isDate()
        .withMessage('fechaCuenta debe ser una fecha'),
    (0, express_validator_1.check)('idEmpleado')
        .not().isEmpty()
        .withMessage('EL id del empleado es obligatorio')
        .isInt()
        .withMessage('El id del empleado debe ser un numero entero'),
    middlewares_1.validFields
], controllers_1.createAccount);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistAccount),
    (0, express_validator_1.check)('nombreCliente')
        .not().isEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('fechaCuenta')
        .not().isEmpty()
        .withMessage('La fecha de la cuenta es obligatorio')
        .isDate()
        .withMessage('fechaCuenta debe ser una fecha'),
    (0, express_validator_1.check)('idEmpleado')
        .not().isEmpty()
        .withMessage('EL id del empleado es  obligatorio')
        .isInt()
        .withMessage('El id del empleado debe ser un numero entero'),
    middlewares_1.validFields
], controllers_1.updateAccount);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistAccount),
    middlewares_1.validFields
], controllers_1.deleteAccount);
exports.default = router;
//# sourceMappingURL=accounts.js.map