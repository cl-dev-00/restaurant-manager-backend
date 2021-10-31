"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const orders_1 = require("../controllers/orders");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/undone', [], orders_1.getOrdersUndone);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistOrder),
    middlewares_1.validFields
], orders_1.getOrder);
router.post('/', [
    (0, express_validator_1.check)('nombreCliente')
        .not().isEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    (0, express_validator_1.check)('fechaOrden')
        .not().isEmpty()
        .withMessage('La fecha de la orden es obligatorio'),
    (0, express_validator_1.check)('idEmpleado')
        .not().isEmpty()
        .withMessage('EL id del empleado es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id del empleado debe ser un numero entero positivo'),
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('EL id del comercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id del comercial debe ser un numero entero positivo'),
    (0, express_validator_1.check)('order_details')
        .not().isEmpty()
        .withMessage('Los order_details son obligatorios')
        .isArray({ min: 1 })
        .withMessage('order_details debe tener al menos un elemento'),
    (0, express_validator_1.check)('order_details.*.id_menu_item')
        .not().isEmpty()
        .withMessage('El id_menu_item es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id_menu_item debe ser un entero positivo')
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
        .exists()
        .withMessage('El comentario es obligatorio')
        .isString()
        .withMessage('El comentario debe ser una cadena de caracteres'),
    middlewares_1.validFields
], orders_1.createOrder);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistOrder),
    (0, express_validator_1.check)('nombreCliente')
        .not().isEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('fechaOrden')
        .not().isEmpty()
        .withMessage('La fecha de la cuenta es obligatorio'),
    (0, express_validator_1.check)('idEmpleado')
        .not().isEmpty()
        .withMessage('EL id del empleado es  obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id del empleado debe ser un numero entero positivo'),
    (0, express_validator_1.check)('idComercial')
        .not().isEmpty()
        .withMessage('EL id del comercial es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id del comercial debe ser un numero entero positivo'),
    (0, express_validator_1.check)('newMenuItems')
        .exists()
        .withMessage('Los newMenuItems son obligatorios')
        .isArray()
        .withMessage('itemsMenuEdit debe ser un array'),
    (0, express_validator_1.check)('newMenuItems.*.id_menu_item')
        .not().isEmpty()
        .withMessage('El id_menu_item es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id_menu_item debe ser un entero positivo')
        .custom(db_validators_1.hasExistMenuItem),
    (0, express_validator_1.check)('newMenuItems.*.cantidad')
        .not().isEmpty()
        .withMessage('La cantidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un entero positivo'),
    (0, express_validator_1.check)('newMenuItems.*.importe')
        .not().isEmpty()
        .withMessage('El importe es obligatorio')
        .isFloat()
        .withMessage('El importe debe ser un numero flotante'),
    (0, express_validator_1.check)('newMenuItems.*.comentario')
        .exists()
        .withMessage('El comentario es obligatorio')
        .isString()
        .withMessage('El comentario debe ser una cadena de caracteres'),
    (0, express_validator_1.check)('itemsMenuEdit')
        .exists()
        .withMessage('Los itemsMenuEdit son obligatorios')
        .isArray()
        .withMessage('itemsMenuEdit debe ser un array'),
    (0, express_validator_1.check)('itemsMenuEdit.*.id_menu_item')
        .not().isEmpty()
        .withMessage('El id_menu_item es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El id_menu_item debe ser un entero positivo')
        .custom(db_validators_1.hasExistMenuItem),
    (0, express_validator_1.check)('itemsMenuEdit.*.idOrden')
        .not().isEmpty()
        .withMessage('El idOrden es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El idOrden debe ser un entero positivo')
        .custom(db_validators_1.hasExistOrder),
    (0, express_validator_1.check)('itemsMenuEdit.*.cantidad')
        .not().isEmpty()
        .withMessage('La cantidad es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un entero positivo'),
    (0, express_validator_1.check)('itemsMenuEdit.*.importe')
        .not().isEmpty()
        .withMessage('El importe es obligatorio')
        .isFloat()
        .withMessage('El importe debe ser un numero flotante'),
    (0, express_validator_1.check)('itemsMenuEdit.*.comentario')
        .exists()
        .withMessage('El comentario es obligatorio')
        .isString()
        .withMessage('El comentario debe ser una cadena de caracteres'),
    (0, express_validator_1.check)('itemsMenuRemove')
        .exists()
        .withMessage('Los itemsMenuRemove son obligatorios')
        .isArray()
        .withMessage('itemsMenuRemove debe ser un array'),
    middlewares_1.validFields
], orders_1.updateOrder);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.hasExistOrder),
    middlewares_1.validFields
], orders_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=orders.js.map