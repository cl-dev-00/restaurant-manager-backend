"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const order_detail_1 = require("../controllers/order-detail");
const router = (0, express_1.Router)();
router.get('/:id/orders', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistOrder),
    middlewares_1.validFields
], order_detail_1.getOrderDetailByOrder);
router.post('/', [
    (0, express_validator_1.check)('order_details')
        .not().isEmpty()
        .withMessage('Los order_details son obligatorios')
        .isArray({ min: 1 })
        .withMessage('order_details debe tener al menos un elemento'),
    (0, express_validator_1.check)('order_details.*.idOrden')
        .not().isEmpty()
        .withMessage('El id de la orden es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id de la orden debe ser un entero positivo')
        .custom(db_validators_1.hasExistOrder),
    (0, express_validator_1.check)('order_details.*.id_item_menu')
        .not().isEmpty()
        .withMessage('El id_item_menu es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id_item_menu debe ser un entero positivo')
        .custom(db_validators_1.hasExistMenuItem),
    (0, express_validator_1.check)('order_details.*.cantidad')
        .not().isEmpty()
        .withMessage('La cantidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un entero positivo'),
    (0, express_validator_1.check)('order_details.*.importe')
        .not().isEmpty()
        .withMessage('El importe es obligatorio')
        .isFloat()
        .withMessage('El importe debe ser un numero flotante'),
    (0, express_validator_1.check)('order_details.*.comentario')
        .not().isEmpty()
        .withMessage('El comentario es obligatorio'),
    middlewares_1.validFields
], order_detail_1.createOrderDetails);
router.delete('/', [], order_detail_1.deleteOrderDetails);
exports.default = router;
//# sourceMappingURL=order-details.js.map