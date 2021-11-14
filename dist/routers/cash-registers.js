"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cash_register_1 = require("../controllers/cash-register");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', [], cash_register_1.getCashRegister);
router.get('/by-date', [], cash_register_1.getCashRegisters);
router.post('/', [
    (0, express_validator_1.check)('fecha')
        .not().isEmpty().withMessage('La fecha es obligatoria')
        .isDate().withMessage('La fecha debe tener el formato correcto')
        .custom(db_validators_1.hasExistCashRegisterByDate),
    (0, express_validator_1.check)('hora_inicio')
        .not().isEmpty().withMessage('La hora inicial es obligatoria'),
    (0, express_validator_1.check)('saldo_inicial')
        .not().isEmpty().withMessage('El saldo inicial es obligatoria')
        .isFloat({ min: 1 }).withMessage('El saldo debe ser un decimal positivo'),
    middlewares_1.validFields
], cash_register_1.createCashRegister);
router.put('/:id', [
    (0, express_validator_1.check)('estado')
        .not().isEmpty().withMessage('El estado es obligatoria')
        .isBoolean().withMessage('El estado debe ser un valor booleano'),
    (0, express_validator_1.check)('hora_final')
        .not().isEmpty().withMessage('La hora final es obligatoria'),
    (0, express_validator_1.check)('efectivo')
        .not().isEmpty().withMessage('El efectivo es obligatoria')
        .isFloat({ min: 1 }).withMessage('El efectivo debe ser un decimal positivo'),
    (0, express_validator_1.check)('saldo_final')
        .not().isEmpty().withMessage('El saldo final es obligatoria')
        .isFloat().withMessage('El saldo debe ser un decimal'),
    (0, express_validator_1.check)('dinero_real')
        .not().isEmpty().withMessage('El dinero_real final es obligatoria')
        .isFloat({ min: 1 }).withMessage('El dinero_real debe ser un decimal positivo'),
    (0, express_validator_1.check)('faltante')
        .not().isEmpty().withMessage('El faltante es obligatoria')
        .isFloat().withMessage('El faltante debe ser un decimal'),
    middlewares_1.validFields
], cash_register_1.updateCashRegister);
exports.default = router;
//# sourceMappingURL=cash-registers.js.map