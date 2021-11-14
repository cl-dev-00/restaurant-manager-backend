"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const box_actions_1 = require("../controllers/box-actions");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', [], box_actions_1.getBoxActions);
router.post('/', [
    (0, express_validator_1.check)('idCashRegister').custom(db_validators_1.hasExistCashRegister),
    (0, express_validator_1.check)('monto')
        .not().isEmpty().withMessage('El monto es obligatorio')
        .isFloat({ min: 1 }).withMessage('El monto debe ser un numero decimal positivo'),
    (0, express_validator_1.check)('isInput')
        .not().isEmpty().withMessage('isInput es obligatorio')
        .isBoolean().withMessage('isInput debe ser un valor booleano'),
    (0, express_validator_1.check)('descripcion')
        .not().isEmpty().withMessage('La descripcion es obligatoria')
        .isString().withMessage('La descripcion debe ser un string'),
    (0, express_validator_1.check)('fecha')
        .not().isEmpty().withMessage('La fecha es obligatoria'),
    middlewares_1.validFields
], box_actions_1.createBoxAction);
exports.default = router;
//# sourceMappingURL=box-actions.js.map