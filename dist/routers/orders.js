"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getOrders);
router.get('/:id/account', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistAccount),
    middlewares_1.validFields
], controllers_1.getOrdersByAccount);
router.post('/', [
    (0, express_validator_1.check)('orders')
        .not().isEmpty()
        .withMessage('orders es obligatorio')
        .isArray({ min: 1 })
        .withMessage('orders debe tener al menos un elemento'),
    (0, express_validator_1.check)('orders.*.idCuenta')
        .not().isEmpty()
        .withMessage('El id de la cuenta es obligatorio')
        .isInt()
        .withMessage('El id de la cuenta debe ser un entero')
        .custom(db_validators_1.hasExistAccount),
    (0, express_validator_1.check)('orders.*.id_item_name')
        .not().isEmpty()
        .withMessage('El id_item_name es obligatorio')
        .isInt()
        .withMessage('El id_item_name debe ser un entero')
        .custom(db_validators_1.hasExistMenuItem),
    (0, express_validator_1.check)('orders.*.cantidad')
        .not().isEmpty()
        .withMessage('La cantidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un entero mayor a cero'),
    (0, express_validator_1.check)('orders.*.importe')
        .not().isEmpty()
        .withMessage('El importe es obligatorio')
        .isFloat()
        .withMessage('El importe debe ser un numero flotante'),
    middlewares_1.validFields
], controllers_1.createOrders);
router.delete('/', [], controllers_1.deleteOrders);
exports.default = router;
//# sourceMappingURL=orders.js.map